# coding:utf-8
from django.db import transaction
from django.contrib.auth.models import User

from account.tools import username_from_email


class RegisterBackend(object):
    @transaction.atomic
    def register(self, request, **kwargs):
        username = username_from_email(kwargs['email'])
        new_user = User.objects.create_user(username, kwargs['email'])
        new_user.set_unusable_password()
        new_user.save()

        return new_user