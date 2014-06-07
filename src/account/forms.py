# coding:utf-8
from django import forms
from django.template import loader
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes


class LoginForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)

    def clean_email(self):
        if not User.objects.filter(email__iexact=self.cleaned_data['email']).exists():
            raise forms.ValidationError(u'Пользователя с таким e-mail не найдено')
        return self.cleaned_data['email']


class RegisterForm(forms.Form):
    email = forms.EmailField()

    def clean_email(self):
        if User.objects.filter(email__iexact=self.cleaned_data['email']).exists():
            raise forms.ValidationError(u'Этот E-mail адрес уже используется')
        return self.cleaned_data['email']


class PasswordResetForm(forms.Form):
    email = forms.EmailField()

    def clean_email(self):
        if not User.objects.filter(email__iexact=self.cleaned_data['email'], is_active=True).exists():
            raise forms.ValidationError(u'Пользователя с таким E-mail не найдено')
        return self.cleaned_data['email']

    def save(self, domain_override=None,
             subject_template_name='registration/password_reset_subject.txt',
             email_template_name='registration/password_reset_email.html',
             use_https=False, token_generator=default_token_generator,
             from_email=None, request=None, html_email_template_name=None):
        """
        Override django.contrib.auth.forms.PasswordResetForm
        remove check ``user.has_usable_password``
        """
        UserModel = get_user_model()
        email = self.cleaned_data["email"]
        active_users = UserModel._default_manager.filter(email__iexact=email, is_active=True)
        for user in active_users:
            if not domain_override:
                current_site = get_current_site(request)
                site_name = current_site.name
                domain = current_site.domain
            else:
                site_name = domain = domain_override
            c = {
                'email': user.email,
                'domain': domain,
                'site_name': site_name,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'user': user,
                'token': token_generator.make_token(user),
                'protocol': 'https' if use_https else 'http',
            }
            subject = loader.render_to_string(subject_template_name, c)
            # Email subject *must not* contain newlines
            subject = ''.join(subject.splitlines())
            email = loader.render_to_string(email_template_name, c)

            if html_email_template_name:
                html_email = loader.render_to_string(html_email_template_name, c)
            else:
                html_email = None
            send_mail(subject, email, from_email, [user.email], html_message=html_email)


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