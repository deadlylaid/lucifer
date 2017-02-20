# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/
import os
from .base import BASE_DIR, BASE_ROOT_DIR

STATIC_URL = '/static/'
MEDIA_URL = '/media/'

STATIC_ROOT = os.path.join(BASE_ROOT_DIR, "dist", "static")
MEDIA_ROOT = os.path.join(BASE_ROOT_DIR, "dist", "media")
