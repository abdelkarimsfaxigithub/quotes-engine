import os
import random
from django.shortcuts import get_object_or_404
from .serializers import QuoteSerializer
from rest_framework import generics
from django.http import HttpResponse
from django.conf import settings
from .models import Quote

from quotes.services.document_service import generate_pdf, generate_word


class QuoteListCreateView(generics.ListCreateAPIView):
    """API endpoint to list and create quotes."""
    serializer_class = QuoteSerializer

    def get_queryset(self):
        queryset = Quote.objects.all().order_by('-created_at')
        params = self.request.query_params

        guarantee_type = params.get("guarantee_type")
        if guarantee_type:
            queryset = queryset.filter(guarantee_type=guarantee_type)

        destination = params.get("destination")
        if destination:
            queryset = queryset.filter(destination=destination)

        work_type = params.get("work_type")
        if work_type:
            queryset = queryset.filter(work_type=work_type)

        client_name = params.get("client_name")
        if client_name:
            queryset = queryset.filter(client_name__icontains=client_name)

        cost_range = params.get("cost_range")
        if cost_range == "<100000":
            queryset = queryset.filter(construction_cost__lt=100000)
        elif cost_range == "100000-500000":
            queryset = queryset.filter(construction_cost__gte=100000, construction_cost__lte=500000)
        elif cost_range == "500000-1000000":
            queryset = queryset.filter(construction_cost__gte=500000, construction_cost__lte=1000000)
        elif cost_range == ">1000000":
            queryset = queryset.filter(construction_cost__gt=1000000)

        return queryset

    def perform_create(self, serializer):
        opportunity_number = serializer.validated_data.get("opportunity_number")

        if not opportunity_number:
            random_number = random.randint(100000, 999999)
            opportunity_number = f"Q-{random_number}"

        serializer.save(opportunity_number=opportunity_number)

class QuoteDetailView(generics.RetrieveDestroyAPIView):
    """
    GET: Retrieve one quote by ID  
    DELETE: Delete the quote by ID
    """
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer


def generate_word_view(request, pk):
    quote = get_object_or_404(Quote, pk=pk)
    template_path = os.path.join(settings.BASE_DIR, 'quotes', 'templates', 'quotes', 'proposal.docx')
    word_file, filename = generate_word(quote, template_path)

    response = HttpResponse(word_file, content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    return response

def generate_pdf_view(request, pk):
    """Generate a commercial proposal PDF from HTML template."""
    quote = Quote.objects.get(pk=pk)
    logo_url = request.build_absolute_uri('/static/logo.png')
    pdf_file, filename = generate_pdf(quote, logo_url)

    response = HttpResponse(pdf_file, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    return response