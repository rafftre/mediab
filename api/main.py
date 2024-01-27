"""
This script runs the application.
"""

import bottle
import logging
import os
import sys

from app import routes, scheduler
from app.task import grabber_task

def configure_logging(level=logging.WARN):
    log_format = '%(asctime)-15s %(levelname)-8s [%(threadName)s] %(message)s'
    logging.basicConfig(level=level,format=log_format)
    if (level == logging.DEBUG):
        logging.getLogger('apscheduler').setLevel(logging.DEBUG)

def main():
    host = os.environ.get('SERVER_HOST', 'localhost')
    try:
        port = int(os.environ.get('SERVER_PORT', '5555'))
    except ValueError:
        port = 5555

    if '--debug' in sys.argv[1:] or 'SERVER_DEBUG' in os.environ:
        debug = True

    configure_logging(logging.DEBUG if debug else logging.WARN)

    scheduler.start()
    scheduler.add_job(grabber_task, 'interval', minutes=15)
    #grabber_task()

    app = bottle.default_app()
    bottle.debug(debug)
    bottle.run(app, server='wsgiref' if debug else 'paste', reloader=debug, host=host, port=port)

    scheduler.shutdown()

if __name__ == '__main__':
    main()
