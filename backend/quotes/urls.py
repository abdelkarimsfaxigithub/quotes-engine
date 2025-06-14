from django.urls import path
from .views import QuoteListCreateView, generate_pdf_view, generate_word_view, QuoteDetailView

urlpatterns = [
    path('', QuoteListCreateView.as_view(), name='quote-list-create'),
    path('<int:pk>/document/pdf/', generate_pdf_view, name='quote-pdf'),
    path('<int:pk>/document/word/', generate_word_view, name='quote-word'),
    path('<int:pk>/', QuoteDetailView.as_view(), name='quote-detail'), 
]
