from django.contrib import admin
from .models import Quote
from django.contrib import admin
from django.utils.translation import gettext_lazy as _



@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    readonly_fields = ('proposed_price',)  # Affiché mais non modifiable
    exclude = ()
    list_display = ('opportunity_number', 'client_name', 'created_at', 'proposed_price')