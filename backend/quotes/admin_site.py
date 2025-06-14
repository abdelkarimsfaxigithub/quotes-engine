# quotes/admin_site.py

from django.contrib.admin import AdminSite
from .models import Quote
from .admin import QuoteAdmin

class CustomAdminSite(AdminSite):
    site_header = "Quote Engine Admin"
    site_title = "Quote Admin Portal"
    index_title = "Bienvenue dans le back-office"

custom_admin_site = CustomAdminSite(name="custom_admin")
custom_admin_site.register(Quote, QuoteAdmin)
