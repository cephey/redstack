# coding:utf-8
from django.conf import settings
from django.http import JsonResponse, HttpResponsePermanentRedirect, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views.generic.edit import FormView
from django.views.generic import TemplateView, RedirectView
from django.utils.decorators import method_decorator
from django.contrib.auth import REDIRECT_FIELD_NAME, authenticate, login, logout

from forms import LoginForm, RegisterForm
from utils.views import JSONView
from utils.decorators import ajax_required
from backends import RegisterBackend
from mixins import LoginRequiredMixin

import urlparse

GENERAL_ERROR_KEY = 'all'
DISABLED_ACCOUNT = {GENERAL_ERROR_KEY: u'Аккаунт заблокирован'}
INVALID_LOGIN = {GENERAL_ERROR_KEY: u'Неверный логин или пароль'}


class LoginView(FormView):
    form_class = LoginForm
    template_name = 'account/login.html'

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            return HttpResponseRedirect(settings.LOGIN_REDIRECT_URL)
        else:
            return super(LoginView, self).get(request, *args, **kwargs)

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
        redirect_to = self.request.REQUEST.get(REDIRECT_FIELD_NAME, False)
        if redirect_to:
            netloc = urlparse.urlparse(redirect_to)[1]
            if netloc and netloc != self.request.get_host():
                redirect_to = settings.LOGIN_REDIRECT_URL
        elif self.request.path == reverse('account:login'):
            redirect_to = settings.LOGIN_REDIRECT_URL

        return redirect_to


class LogoutView(RedirectView):
    def get_redirect_url(self, *args, **kwargs):
        return self.request.META.get('HTTP_REFERER', '/')

    def get(self, request, *args, **kwargs):
        logout(request)
        return super(LogoutView, self).get(request, *args, **kwargs)


class RegistrationView(FormView):
    form_class = RegisterForm

    def get(self, request, *args, **kwargs):
        return HttpResponsePermanentRedirect(reverse('/'))

    @method_decorator(ajax_required)
    def post(self, request, *args, **kwargs):
        return super(RegistrationView, self).post(request, *args, **kwargs)

    def get_success_url(self):
        return self.request.REQUEST.get(REDIRECT_FIELD_NAME, False)

    def form_valid(self, form):
        registration_backend = RegisterBackend()
        new_user = registration_backend.register(self.request, **form.cleaned_data)
        new_user.backend = 'django.contrib.auth.backends.ModelBackend'
        login(self.request, new_user)
        return JsonResponse({'success': True, 'redirect': self.get_success_url()})

    def form_invalid(self, form):
        return JsonResponse({'success': False, 'errors': form.errors})


class ProfileView(LoginRequiredMixin, TemplateView):
    template_name = 'account/profile.html'


class CheckAuthUserView(JSONView):
    def get_context_data(self, **kwargs):
        context = super(CheckAuthUserView, self).get_context_data(**kwargs)
        context['auth'] = self.request.user.is_authenticated()
        return context