# from passlib.context import CryptContext

# password_context = CryptContext(schemes=["bcrypt"])

# MAX_BCRYPT_LENGTH = 72

# def generate_password_hash(password: str) -> str:
#     # truncate if too long
#     password = password[:MAX_BCRYPT_LENGTH]
#     return password_context.hash(password)

# def verify_password(password: str, hash: str) -> bool:
#     password = password[:MAX_BCRYPT_LENGTH]
#     return password_context.verify(password, hash)


# use of argon
from datetime import timedelta, datetime
from src.config import Config
from passlib.hash import argon2
import uuid
import logging
import jwt


def generate_password_hash(password: str) -> str:
    return argon2.hash(password)


def verify_password(password: str, hash: str) -> bool:
    return argon2.verify(password, hash)


Access_TOKEN_EXPIRY = 3600


def create_access_token(
    user_data: dict, expiry: timedelta = None, refresh: bool = False
):
    payload = {}
    payload["user"] = user_data
    payload["exp"] = datetime.now() + (
        expiry if expiry is not None else timedelta(seconds=Access_TOKEN_EXPIRY)
    )
    payload["jti"] = str(uuid.uuid4)  # to serialize to json so converted to string
    payload["refresh"] = refresh
    token = jwt.encode(
        payload=payload, key=Config.JWT_SECRET, algorithm=Config.JWT_ALGORITHM
    )

    return token


def decode_token(token: str) -> dict:
    try:
        token_data = jwt.decode(
            jwt=token, key=Config.JWT_SECRET, algorithms=Config.JWT_ALGORITHM
        )
        return token_data
    except jwt.PyJWKError as e:
        logging.exception(e)
        return None
