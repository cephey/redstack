# coding:utf-8
from django.db import models
from django.contrib.auth.models import User

import autoslug


class Benefits(models.Model):
    name = models.CharField(max_length=255)
    icon = models.CharField(max_length=255)

    class Meta:
        verbose_name = u'Преимущество'
        verbose_name_plural = u'Преимущества'

    def __unicode__(self):
        return u'{}'.format(self.name)


class Tariff(models.Model):
    name = models.CharField(max_length=255)
    slug = autoslug.AutoSlugField(populate_from='name')
    price = models.PositiveIntegerField()
    description = models.TextField()
    benefits = models.ManyToManyField(Benefits)

    class Meta:
        ordering = ('price',)
        verbose_name = u'Тариф'
        verbose_name_plural = u'Тарифы'

    def __unicode__(self):
        return u'{}'.format(self.name)


class Pattern(models.Model):
    name = models.CharField(max_length=255)
    img = models.ImageField(upload_to='pattern/')
    tariff = models.ManyToManyField(Tariff)

    class Meta:
        verbose_name = u'Шаблон'
        verbose_name_plural = u'Шаблоны'

    def __unicode__(self):
        return u'{}'.format(self.name)


class Order(models.Model):
    user = models.ForeignKey(User, related_name='orders')
    name = models.CharField(max_length=255)
    pattern = models.ForeignKey(Pattern)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = u'Сайт'
        verbose_name_plural = u'Сайты'

    def __unicode__(self):
        return u'Заказ пользователя {} номер {}'.format(self.user, self.id)