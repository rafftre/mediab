import os
import json
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool

with open('config.json', 'r') as f:
    config = json.load(f)

API_KEY = config['DEFAULT']['API_KEY']

DB_URL = 'postgresql://%s:%s@%s/%s' % (
    config['DEFAULT']['DATABASE_USER'],
    config['DEFAULT']['DATABASE_PASSWD'],
    config['DEFAULT']['DATABASE_SERVER'],
    config['DEFAULT']['DATABASE_NAME']
)

# SQLAlchemy shared config

Base = declarative_base()

#engine = create_engine('sqlite:///:memory:', echo=True)
engine = create_engine(DB_URL, poolclass=QueuePool, pool_size=10, max_overflow=20, echo=False)

Session = sessionmaker(bind=engine)

# APScheduler shared config

scheduler = BackgroundScheduler()
