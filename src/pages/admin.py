from django.contrib import admin

from .models import Benefits, Tariff, Pattern, Order


@admin.register(Benefits)
class BenefitsAdmin(admin.ModelAdmin):
    pass


@admin.register(Tariff)
class TariffAdmin(admin.ModelAdmin):
    pass


@admin.register(Pattern)
class PatternAdmin(admin.ModelAdmin):
    pass


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass