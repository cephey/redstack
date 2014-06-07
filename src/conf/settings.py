#coding:utf-8
import os
import json
from ConfigParser import RawConfigParser

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

config = RawConfigParser()
config.read(os.path.join(BASE_DIR, 'settings.ini'))

########## Версия сайта #####
CONF = 'prod'
# Доступные варианты:
#   prod
#   dev
#############################

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '3*ht_i78=^ydrz-3hv75ub30i3ip^*v+iu4vjo%bd=cicw)egs'

DEBUG = config.getboolean(CONF, 'DEBUG')
TEMPLATE_DEBUG = DEBUG

ALLOWED_HOSTS = ['*']

INTERNAL_IPS = (
    '127.0.0.1',
)


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django.contrib.webdesign',

    'pages',
    'account',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.core.context_processors.static',
    'django.core.context_processors.tz',
    'django.core.context_processors.request',
    'django.contrib.messages.context_processors.messages',
)

ROOT_URLCONF = 'conf.urls'

WSGI_APPLICATION = 'conf.wsgi.application'


# Database

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Internationalization

TIME_ZONE = 'Europe/Moscow'
LANGUAGE_CODE = 'ru-RU'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'collected_static'),
)

TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'templates'),
)

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# AUTHENTICATION

LOGIN_URL = '/login/'

LOGOUT_URL = '/logout/'

LOGIN_REDIRECT_URL = '/profile/'