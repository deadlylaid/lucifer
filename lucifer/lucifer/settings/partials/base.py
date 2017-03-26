import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
# BASE_DIR = '/Users/hanminsoo/Documents/lucifer/lucifer'
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

BASE_ROOT_DIR = os.path.dirname(BASE_DIR)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '3xv)q*e7uwlr1#ssi3hqw+bw&ryhbtx&$9)-a#a6_8i&&ryn3!'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'drf_multiple_model',
    'django_summernote',
    'social_django',
    'versatileimagefield',

    'lucifer',
    'users',
    'posts',

    'game',
    'game.characters',
    'game.skills',
    'game.items',
    'game.monsters',
    'game.stages',
    'game.npc',
    'game.quests',
]

AUTHENTICATION_BACKENDS = (
        'social_core.backends.facebook.FacebookOAuth2',
        'social_core.backends.kakao.KakaoOAuth2',
        'social_core.backends.naver.NaverOAuth2',
        'django.contrib.auth.backends.ModelBackend',
        )

SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/'

SOCIAL_AUTH_FACEBOOK_KEY = '1698604086822847'
SOCIAL_AUTH_FACEBOOK_SECRET = '39bcc6856d6b5d46750cdace2f5aa390'

SOCIAL_AUTH_KAKAO_KEY = '3ded519d4e1aad20e12bb0e475331f4e'
SOCIAL_AUTH_KAKAO_SECRET = '2fd614490364163dcdfb6ff0b5a0f393'

SOCIAL_AUTH_NAVER_KEY = 'G3Y2v6sWq_8ZyGfRk2BB'
SOCIAL_AUTH_NAVER_SECRET = '3eoytgYuqT'

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

INTERNAL_IPS = ('127.0.0.1')

ROOT_URLCONF = 'lucifer.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'lucifer.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

AUTH_USER_MODEL = 'users.User'
