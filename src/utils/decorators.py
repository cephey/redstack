# coding:utf-8
from django.http import HttpResponseBadRequest, HttpResponse

from functools import wraps


def ajax_required(f):
    """
    AJAX request required decorator

    @ajax_required
    def my_view(request):
        ....
    """

    @wraps(f)
    def wrapper(request, *args, **kwargs):
        if not request.is_ajax():
            return HttpResponseBadRequest()
        return f(request, *args, **kwargs)

    return wrapper


def login_required_ajax(function=None, redirect_field_name=None):
    """
    Just make sure the user is authenticated to access a certain ajax view

    Otherwise return a HttpResponse 401 - authentication required
    instead of the 302 redirect of the original Django decorator
    """

    def _decorator(view_func):
        def _wrapped_view(request, *args, **kwargs):
            if request.user.is_authenticated():
                return view_func(request, *args, **kwargs)
            else:
                return HttpResponse(status=401)

        return _wrapped_view

    if function is None:
        return _decorator
    else:
        return _decorator(function)