"""
Routes and views for the Bottle application.
"""

import json
import logging
from bottle import hook, response, route

from app.model import get_last_api_result

_allow_origin = '*'
_allow_methods = 'PUT, GET, POST, DELETE, OPTIONS'
_allow_headers = 'Authorization, Origin, Accept, Content-Type, X-Requested-With'

def _as_dict(input_string):
    return json.loads(input_string)

def _dump_object(obj):
    if obj is None:
        return ''
    return json.dumps(obj)

@hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = _allow_origin
    response.headers['Access-Control-Allow-Methods'] = _allow_methods
    response.headers['Access-Control-Allow-Headers'] = _allow_headers

@route('/')
def standings():
    logger = logging.getLogger(__name__)
    logger.debug('GET standings')

    result = get_last_api_result();
    logger.debug('last api result: %s', str(result))

    response.headers['Content-Type'] = 'application/json'
    response.headers['Cache-Control'] = 'no-cache'
    return _dump_object(result)
