"""
Background tasks for scheduling.
"""

import json
import logging
import requests

from app import API_KEY
from app.model import ApiResult, get_last_api_result, save_api_result

_api_url = 'https://api-football-v1.p.mashape.com/leagues/95'
_api_header_key = 'X-Mashape-Key'
_api_header_limit = 'X-RateLimit-requests-Limit'
_api_header_remaining = 'X-RateLimit-requests-Remaining'

def grabber_task():
    logger = logging.getLogger(__name__)
    logger.debug('grabber_task')

    lastRes = get_last_api_result()
    if lastRes is not None and lastRes.remaining < 5:
        logger.debug('grabber_task remaining is %s', str(lastRes.remaining))
        return
    logger.debug('grabber_task last result is %s', lastRes)
    # TODO: if apiRemaining <= 0: skip

    response = requests.get(_api_url, headers={ _api_header_key: API_KEY })
    if (response.status_code != 200):
        logger.warning('API failure: %s %s', response.status_code, response.content)
        return

    apiLimit = response.headers[_api_header_limit]
    apiRemaining = response.headers[_api_header_remaining]
    logger.info('API limit: %s/%s', apiRemaining, apiLimit)

    if 'error' in response.content.decode('UTF-8'):
        logger.warning('API error: %s', response.content)
        apiData = b'';
    else:
        apiData = response.content

    # TODO: save apiRemaining and apiData in a new row
    result = ApiResult(apiRemaining, apiData)
    save_api_result(result)
