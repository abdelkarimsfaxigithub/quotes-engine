import io
import datetime
from django.template.loader import render_to_string
from django.template.loader import render_to_string
from docxtpl import DocxTemplate
from weasyprint import HTML




def generate_word(quote, template_path):
    doc = DocxTemplate(template_path)

    # Contexte avec les variables
    context = {
    'client_name': quote.client_name,
    'opportunity_number': quote.opportunity_number,
    'guarantee_type': quote.get_guarantee_type_display(),
    'proposed_price': quote.proposed_price,
    'construction_cost': quote.construction_cost,
    'work_type': quote.get_work_type_display(),
    'destination': quote.get_destination_display(),
    'created_at': quote.created_at.strftime('%d/%m/%Y') if quote.created_at else '',
    'start_date': quote.start_date.strftime('%d/%m/%Y') if quote.start_date else '',
    'end_date': quote.end_date.strftime('%d/%m/%Y') if quote.end_date else '',
    'has_existing_building': 'Oui' if quote.has_existing_building else 'Non',
    'is_vip_client': 'Oui' if quote.is_vip_client else 'Non',
    'wants_rcmo': 'Oui' if quote.wants_rcmo else 'Non',
}

    # Rendu du template
    doc.render(context)

    # Exporter en mémoire
    word_buffer = io.BytesIO()
    doc.save(word_buffer)
    word_buffer.seek(0)

    filename = f"Proposition_commerciale_{quote.opportunity_number}_{datetime.datetime.now().strftime('%Y%m%d_%H%M')}.docx"
    return word_buffer, filename

def generate_pdf(quote, logo_url):
    """Generate a commercial proposal PDF from HTML template."""
    context = {
        'client_name': quote.client_name,
        'opportunity_number': quote.opportunity_number,
        'created_at': quote.created_at.strftime('%d/%m/%Y'),
        'start_date': quote.start_date.strftime('%d/%m/%Y') if quote.start_date else '',
        'end_date': quote.end_date.strftime('%d/%m/%Y') if quote.end_date else '',
        'guarantee_type': quote.get_guarantee_type_display(),
        'destination': quote.get_destination_display(),
        'work_type': quote.get_work_type_display(),
        'has_existing_building': 'Oui' if quote.has_existing_building else 'Non',
        'is_vip_client': 'Oui' if quote.is_vip_client else 'Non',
        'wants_rcmo': 'Oui' if quote.wants_rcmo else 'Non',
        'construction_cost': f"{quote.construction_cost:,.2f}".replace(',', ' ').replace('.', ','),
        'proposed_price': f"{quote.proposed_price:,.2f}".replace(',', ' ').replace('.', ','),
        'logo_url': logo_url,
    }

    html_string = render_to_string('quotes/proposal.html', context)
    pdf_file = HTML(string=html_string).write_pdf()

    filename = f"Proposition_commerciale_{quote.opportunity_number}_{datetime.datetime.now().strftime('%Y%m%d_%H%M')}.pdf"
    
    return pdf_file, filename