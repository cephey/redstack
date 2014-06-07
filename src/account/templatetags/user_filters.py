#coding:utf-8
from django import template

register = template.Library()


@register.filter(name='display')
def display(user):
    limit = 12
    email = user.email.split('@')
    if email[0] > limit:
        email[0] = email[0][:limit-3] + '...'
    return '@'.join(email)
display.isSafe = True