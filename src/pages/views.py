# coding:utf-8

from django.core.urlresolvers import reverse
from django.views.generic import TemplateView
from django.views.generic.edit import FormView
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from forms import SiteForm

from utils.views import JSONView


class IndexView(TemplateView):
    """"""
    template_name = 'index.html'


class PatternView(FormView):
    """"""
    template_name = 'pattern.html'
    form_class = SiteForm

    def get_context_data(self, **kwargs):
        kwargs['images'] = [
            {'path': 'f_1.jpg', 'val': 'f_1'},
            {'path': 'f_2.jpg', 'val': 'f_2'},
            {'path': 'f_3.jpg', 'val': 'f_3'}
        ]

        return super(PatternView, self).get_context_data(**kwargs)

    def get_form_kwargs(self):
        """
        Override
        """
        kwargs = {
            'initial': self.get_initial(),
            'prefix': self.get_prefix(),
        }

        if self.request.method in ('POST', 'PUT'):
            post_values = self.request.POST.copy()
            post_values['site_type'] = self.kwargs.get('type', '')

            kwargs.update({
                'data': post_values,
                'files': self.request.FILES,
            })
        return kwargs

    def get_success_url(self):
        """
        Override
        """
        return reverse('pages:index')


class CheckAuthUserView(JSONView):
    def get_context_data(self, **kwargs):
        context = super(CheckAuthUserView, self).get_context_data(**kwargs)
        context['auth'] = self.request.user.is_authenticated()
        return context


def login_view(request):
    email = request.POST['email']
    password = request.POST['password']
    user = authenticate(username=email, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'message': 'Disabled account'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid login'})


def logout_view(request):
    from django.shortcuts import redirect

    logout(request)

    return redirect(request.META['HTTP_REFERER'])