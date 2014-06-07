#coding:utf-8
import base64
import hashlib


RESET_PASSWORD_CONFIRM_TEXT = u"""
<strong>Инструкция отправлена</strong><br/>
Мы выслали на ваш e-mail инструкцию по восстановлению пароля, она короткая и простая. Письмо должно прийти с минуты на минуту.<br/>
Если вы не получили письмо — проверьте в папке со спамом.
"""


def username_from_email(email):
    """
    Создаю имя пользователя как ``base64(sha1(email))``
    Он не может быть длинее 30 символов
    """
    return base64.b64encode(hashlib.sha1(email).digest())