# coding:utf-8
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordResetForm as DjangoPasswordResetForm


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)


class RegisterForm(forms.Form):
    email = forms.EmailField()

    def clean_email(self):
        if User.objects.filter(email__iexact=self.cleaned_data['email']):
            raise forms.ValidationError(u'Этот E-mail адрес уже используется')
        return self.cleaned_data['email']


class PasswordResetForm(DjangoPasswordResetForm):

    def clean_email(self):
        if not User.objects.filter(email__iexact=self.cleaned_data['email']).exists():
            raise forms.ValidationError(u'Пользователя с таким E-mail не найдено')
        return self.cleaned_data['email']