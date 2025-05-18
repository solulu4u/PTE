import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
from .config import settings


@contextmanager
def get_db_connection():
    conn = None
    try:
        conn = psycopg2.connect(
            host=settings.DB_HOST,
            port=settings.DB_PORT,
            database=settings.DB_NAME,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            cursor_factory=RealDictCursor
        )
        yield conn
    finally:
        if conn is not None:
            conn.close()


@contextmanager
def get_db_cursor():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        try:
            yield cursor
            conn.commit()
        finally:
            cursor.close()
