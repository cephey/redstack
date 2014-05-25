#coding:utf-8

from django.shortcuts import render
from django.views.generic import TemplateView


class IndexView(TemplateView):
    """"""
    template_name = 'index.html'


class PatternView(TemplateView):
    """"""
    template_name = 'pattern.html'

    def get_context_data(self, **kwargs):
        kwargs['images'] = [
            {'path': 'f_1.jpg', 'val': 'f_1'},
            {'path': 'f_2.jpg', 'val': 'f_2'},
            {'path': 'f_3.jpg', 'val': 'f_3'}
        ]
        return super(PatternView, self).get_context_data(**kwargs)