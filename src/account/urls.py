# coding:utf-8
from django.conf.urls import patterns, url
import views

urlpatterns = patterns(
    '',
    url(r'^login/$', views.LoginView.as_view(), name="login"),
    url(r'^logout/$', views.LogoutView.as_view(), name='logout'),
    url(r'^registration/$', views.RegistrationView.as_view(), name='registration'),

    url(r'^password_reset/$', views.PasswordResetView.as_view(), name='password_reset'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>.+)/$',
        views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    url(r'^password_change/$', views.PasswordChangeView.as_view(), name='password_change'),

    url(r'^profile/$', views.ProfileView.as_view(), name='profile'),
)