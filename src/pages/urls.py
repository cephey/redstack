# coding:utf-8
from django.conf.urls import patterns, url
from views import IndexView, OrderView

urlpatterns = patterns(
    '',
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^pattern/(?P<type>\w+)/$', OrderView.as_view(), name='order'),
)