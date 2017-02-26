import os
import uuid
from datetime import datetime


def uploaded_filepath(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    today = datetime.now().strftime('%Y-%m-%d')
    return os.path.join('django-summernote', today, filename)


SUMMERNOTE_CONFIG = {

        'width': '80%',
        'attachment_upload_to': uploaded_filepath,
        'attachment_filesize_limit': 1024 * 1024,
        'toolbar': [
            ['style', ['style']],
            ['insert', ['link', 'picture']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'height']],
        ],
}
