# coding:utf-8
from django.core.urlresolvers import reverse
from django.views.generic import TemplateView
from django.views.generic.edit import CreateView
from django.utils.decorators import method_decorator
from django.http import JsonResponse

from utils.decorators import login_required_ajax
from .models import Pattern, Order, Tariff


class IndexView(TemplateView):
    template_name = 'pages/index.html'

    def get_context_data(self, **kwargs):
        kwargs['tariffs'] = Tariff.objects.select_related('benefits')
        return super(IndexView, self).get_context_data(**kwargs)


class OrderView(CreateView):
    model = Order
    fields = ['name', 'pattern']
    template_name = 'pages/pattern.html'

    @method_decorator(login_required_ajax)
    def post(self, request, *args, **kwargs):
        return super(OrderView, self).post(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        kwargs['patterns'] = Pattern.objects.all()
        return super(OrderView, self).get_context_data(**kwargs)

    def get_success_url(self):
        return reverse('pages:index')

    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.user = self.request.user
        self.object.save()
        return JsonResponse({'success': True, 'redirect': self.get_success_url()})

    def form_invalid(self, form):
        return JsonResponse({'success': False, 'errors': form.errors})