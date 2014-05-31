#coding:utf-8

from django.conf.urls import patterns, url
from .views import IndexView, PatternView, CheckAuthUserView

urlpatterns = patterns('',
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^pattern/(?P<type>\w+)/$', PatternView.as_view(), name='pattern'),

    url(r'^cuau/$', CheckAuthUserView.as_view(), name='check_user_auth_url'),
)