from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    DATABASE_URL: Optional[str] = None
    JWT_SECRET: Optional[str] = None
    JWT_ALGORITHM: Optional[str] = None
    REDIS_URL: Optional[str] = None
    
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


config = Settings()