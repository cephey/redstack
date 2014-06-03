# coding:utf-8
from django.conf.urls import patterns, url
from views import LoginView, LogoutView, CheckAuthUserView, ProfileView, RegistrationView

urlpatterns = patterns(
    '',
    url(r'^login/$', LoginView.as_view(), name="login"),
    url(r'^logout/$', LogoutView.as_view(), name='logout'),
    url(r'^profile/$', ProfileView.as_view(), name='profile'),
    url(r'^registration/$', RegistrationView.as_view(), name='registration'),

    url(r'^cuau/$', CheckAuthUserView.as_view(), name='check_user_auth_url'),
)