# coding:utf-8
from django import forms


SITE_TYPE = [
    ('simple', u'Визитка'),
    ('business', u'Бизнес'),
    ('shop', u'Магазин')
]


class SiteForm(forms.Form):
    site_name = forms.CharField(required=True)
    site_type = forms.ChoiceField(choices=SITE_TYPE, required=True)
    site_template = forms.CharField(required=True)