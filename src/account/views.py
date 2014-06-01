# coding:utf-8
from django.conf import settings
from django.http import JsonResponse
from django.views.generic.edit import FormView
from django.views.generic import TemplateView
from django.utils.decorators import method_decorator
from django.contrib.auth import REDIRECT_FIELD_NAME, authenticate, login, logout

from forms import LoginForm
from utils.views import JSONView
from utils.decorators import ajax_required
from mixins import LoginRequiredMixin

import urlparse

GENERAL_ERROR_KEY = 'all'
DISABLED_ACCOUNT = {GENERAL_ERROR_KEY: u'Аккаунт заблокирован'}
INVALID_LOGIN = {GENERAL_ERROR_KEY: u'Неверный логин или пароль'}


class LoginView(FormView):
    form_class = LoginForm
    template_name = 'account/login.html'
    success_url = ''

    @method_decorator(ajax_required)
    def post(self, request, *args, **kwargs):
        return super(LoginView, self).post(request, *args, **kwargs)

    def form_valid(self, form):
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']

        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                login(self.request, user)
                return JsonResponse({'success': True, 'redirect': self.get_success_url()})
            else:
                return JsonResponse({'success': False, 'errors': DISABLED_ACCOUNT})
        else:
            return JsonResponse({'success': False, 'errors': INVALID_LOGIN})

    def form_invalid(self, form):
        return JsonResponse({'success': False, 'errors': form.errors})

    def get_success_url(self):
        redirect_to = self.request.REQUEST.get(REDIRECT_FIELD_NAME, '')
        if redirect_to:
            netloc = urlparse.urlparse(redirect_to)[1]
            if netloc and netloc != self.request.get_host():
                redirect_to = settings.LOGIN_REDIRECT_URL
        else:
            if self.request.META['HTTP_REFERER'] == 'login':
                redirect_to = settings.LOGIN_REDIRECT_URL
            else:
                redirect_to = False

        return redirect_to


def logout_view(request):
    from django.shortcuts import redirect

    logout(request)

    return redirect(request.META['HTTP_REFERER'])


class ProfileView(LoginRequiredMixin, TemplateView):

    template_name = 'account/profile.html'


class CheckAuthUserView(JSONView):
    def get_context_data(self, **kwargs):
        context = super(CheckAuthUserView, self).get_context_data(**kwargs)
        context['auth'] = self.request.user.is_authenticated()
        return context