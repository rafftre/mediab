"""
SQLAlchemy database model.
"""

from sqlalchemy import func, Column, DateTime, Integer, String, TypeDecorator

from app import engine, Base, Session

class HexByteString(TypeDecorator):
    """Convert Python bytestring to string with hexadecimal digits and back for storage."""

    impl = String

    def process_bind_param(self, value, dialect):
        if not isinstance(value, bytes):
            raise TypeError("HexByteString columns support only bytes values.")
        return value.hex()

    def process_result_value(self, value, dialect):
        return bytes.fromhex(value) if value else None

class ApiResult(Base):
    __tablename__ = 'api_result'

    result_time = Column(DateTime, default=func.now(), primary_key=True)
    remaining = Column(Integer)
    data = Column(HexByteString)

    def __init__(self, remaining, data):
        self.remaining = remaining
        self.data = data

    def __repr__(self):
        return "ApiResult('%s', '%d', '%s')" % (self.result_time, self.remaining, self.data)

Base.metadata.create_all(engine)

def get_last_api_result():
    session = Session()

    try:
        query = session.query(ApiResult) \
            .order_by(ApiResult.result_time.desc()) \
            .limit(1)
        return query.one_or_none()
    finally:
        session.close()

def save_api_result(apiResult):
    session = Session()

    try:
        session.add(apiResult)
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
