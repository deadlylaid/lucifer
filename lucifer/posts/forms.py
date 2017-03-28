from django import forms
from django_summernote.widgets import SummernoteWidget
from posts.models import FreeBoard


class PostForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(PostForm, self).__init__(*args, **kwargs)

        self.fields['title'].label = "제 목"
        self.fields['content'].label = "내 용"

    class Meta:
        model = FreeBoard
        widgets = {
            'title': forms.fields.TextInput(
                attrs={
                    'class': 'text',
                    'placeholder': '제목 입력',
                    'required': 'true'
                    }
                ),
            'content': SummernoteWidget(),
        }
        fields = ('title', 'content',)
