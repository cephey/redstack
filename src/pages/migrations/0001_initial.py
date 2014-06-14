# encoding: utf8
from __future__ import unicode_literals

from django.db import models, migrations
import autoslug.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Benefits',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('icon', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': '\u041f\u0440\u0435\u0438\u043c\u0443\u0449\u0435\u0441\u0442\u0432\u043e',
                'verbose_name_plural': '\u041f\u0440\u0435\u0438\u043c\u0443\u0449\u0435\u0441\u0442\u0432\u0430',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Tariff',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('slug', autoslug.fields.AutoSlugField(editable=False)),
                ('price', models.PositiveIntegerField()),
                ('description', models.TextField()),
                ('benefits', models.ManyToManyField(to='pages.Benefits')),
            ],
            options={
                'ordering': (b'price',),
                'verbose_name': '\u0422\u0430\u0440\u0438\u0444',
                'verbose_name_plural': '\u0422\u0430\u0440\u0438\u0444\u044b',
            },
            bases=(models.Model,),
        ),
    ]
