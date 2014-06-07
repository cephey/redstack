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
        if not User.objects.filter(email__iexact=self.cleaned_data['email'], is_active=True).exists():
            raise forms.ValidationError(u'Пользователя с таким E-mail не найдено')
        return self.cleaned_data['email']


class SetPasswordForm(forms.Form):
    new_password = forms.CharField(widget=forms.PasswordInput)

    def __init__(self, user, *args, **kwargs):
        self.user = user
        super(SetPasswordForm, self).__init__(*args, **kwargs)

    def save(self, commit=True):
        self.user.set_password(self.cleaned_data['new_password'])
        if commit:
            self.user.save()
        return self.user


class PasswordChangeForm(SetPasswordForm):
    old_password = forms.CharField(widget=forms.PasswordInput)

    def clean_old_password(self):
        old_password = self.cleaned_data["old_password"]
        if not self.user.check_password(old_password):
            raise forms.ValidationError(u'Ваш старый пароль введен не верно')
        return old_password