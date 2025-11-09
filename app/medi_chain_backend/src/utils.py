from datetime import timedelta, datetime
from src.config import config
from passlib.hash import argon2
import uuid
import logging
import jwt
from typing import Optional


def generate_password_hash(password: str) -> str:
    return argon2.hash(password)


def verify_password(password: str, hash: str) -> bool:
    return argon2.verify(password, hash)


ACCESS_TOKEN_EXPIRY = 3600


def create_access_token(
    user_data: dict, expiry: Optional[timedelta] = None, refresh: bool = False
):
    payload = {}
    payload["user"] = user_data
    payload["exp"] = datetime.now() + (
        expiry if expiry is not None else timedelta(seconds=ACCESS_TOKEN_EXPIRY)
    )
    payload["jti"] = str(uuid.uuid4())  # to serialize to json so converted to string
    payload["refresh"] = refresh
    token = jwt.encode(
        payload=payload, key=config.JWT_SECRET or "secret", algorithm=config.JWT_ALGORITHM or "HS256"
    )

    return token


def decode_token(token: str) -> Optional[dict]:
    try:
        token_data = jwt.decode(
            jwt=token, key=config.JWT_SECRET or "secret", algorithms=[config.JWT_ALGORITHM or "HS256"]
        )
        return token_data
    except jwt.PyJWTError as e:
        logging.exception(e)
        return None