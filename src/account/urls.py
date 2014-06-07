# coding:utf-8
from django.conf.urls import patterns, url
from django.contrib.auth.views import password_reset_confirm
from views import LoginView, LogoutView, CheckAuthUserView, ProfileView, RegistrationView, PasswordResetView

urlpatterns = patterns(
    '',
    url(r'^login/$', LoginView.as_view(), name="login"),
    url(r'^logout/$', LogoutView.as_view(), name='logout'),
    url(r'^profile/$', ProfileView.as_view(), name='profile'),
    url(r'^registration/$', RegistrationView.as_view(), name='registration'),

    url(r'^reset_password/$', PasswordResetView.as_view(), name='reset_password'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>.+)/$',
        password_reset_confirm, name='password_reset_confirm'),

    url(r'^cuau/$', CheckAuthUserView.as_view(), name='check_user_auth_url'),
)