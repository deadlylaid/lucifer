from django import forms
from django_summernote.widgets import SummernoteWidget
from posts.models import FreeBoard


class PostForm(forms.ModelForm):

    class Meta:
        model = FreeBoard
        widgets = {
            'content': SummernoteWidget(),
        }
        fields = ('title', 'content',)
