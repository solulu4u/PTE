from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database settings
    DB_HOST: str = "164.90.136.110"
    DB_PORT: int = 5432
    DB_NAME: str = "mydb"
    DB_USER: str = "myuser"
    DB_PASSWORD: str = "mypassword"

    # JWT settings
    SECRET_KEY: str = "your-secret-key-here"  # Thay đổi trong production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"


settings = Settings()
