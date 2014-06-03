#coding:utf-8
import base64
import hashlib


def username_from_email(email):
    """
    Создаюимя пользователя как ``base64(sha1(email))``
    Он не может быть длинее 30 символов
    """
    return base64.b64encode(hashlib.sha1(email).digest())