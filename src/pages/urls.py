#coding:utf-8

from django.conf.urls import patterns, url
from .views import IndexView, PatternView, CheckAuthUserView, login_view, logout_view

urlpatterns = patterns('',
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^pattern/(?P<type>\w+)/$', PatternView.as_view(), name='pattern'),

    url(r'^cuau/$', CheckAuthUserView.as_view(), name='check_user_auth_url'),

    url(r'^login/$', login_view, name='login'),
    url(r'^logout/$', logout_view, name='logout'),
)