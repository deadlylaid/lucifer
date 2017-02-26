from django import forms
from django_summernote.widgets import SummernoteWidget
from posts.models import FreeBoard


class PostForm(forms.ModelForm):

    class Meta:
        model = FreeBoard
        widgets = {
            'title': forms.fields.TextInput(
                attrs={
                    'placeholder': '제목 입력',
                    'required': 'true'
                    }
                ),
            'content': SummernoteWidget(),
        }
        fields = ('title', 'content',)
