# encoding: utf8
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pattern',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('img', models.ImageField(upload_to=b'pattern/')),
                ('tariff', models.ManyToManyField(to='pages.Tariff')),
            ],
            options={
                'verbose_name': '\u0428\u0430\u0431\u043b\u043e\u043d',
                'verbose_name_plural': '\u0428\u0430\u0431\u043b\u043e\u043d\u044b',
            },
            bases=(models.Model,),
        ),
    ]
