# encoding: utf8
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pages', '0002_pattern'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, to_field='id')),
                ('name', models.CharField(max_length=255)),
                ('pattern', models.ForeignKey(to='pages.Pattern', to_field='id')),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': '\u0421\u0430\u0439\u0442',
                'verbose_name_plural': '\u0421\u0430\u0439\u0442\u044b',
            },
            bases=(models.Model,),
        ),
    ]
