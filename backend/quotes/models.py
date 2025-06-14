from django.db import models
from decimal import Decimal


class Quote(models.Model):
    """Quote model representing an insurance pricing request."""

    opportunity_number = models.CharField(max_length=100)
    client_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    # Project dates
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    # Guarantee type
    GUARANTEE_CHOICES = [
    ("DO", "DO seule"),
    ("TRC", "TRC seule"),
    ("DUO", "DO + TRC"),
]
    guarantee_type = models.CharField(max_length=20, choices=GUARANTEE_CHOICES, default="DO")

    # Destination
    DESTINATION_CHOICES = [
    ("housing", "Habitation"),
    ("non_housing", "Hors habitation"),
]
    destination = models.CharField(max_length=50, choices=DESTINATION_CHOICES, default="housing")

    # Work type
    WORK_CHOICES = [
    ("light_reno", "Rénovation légère"),
    ("heavy_reno", "Rénovation lourde"),
    ("new_build", "Ouvrage neuf"),
]
    work_type = models.CharField(max_length=50, choices=WORK_CHOICES, default="light_reno")

    # Other boolean flags
    has_existing_building = models.BooleanField(default=False)
    is_vip_client = models.BooleanField(default=False)
    wants_rcmo = models.BooleanField(default=False)

    # Financials
    construction_cost = models.DecimalField(
        max_digits=12, decimal_places=2, default=0.00
    )

    # Auto-calculated price
    proposed_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )

    def calculate_price(self):
        """Calculate proposed price based on guarantee type and construction cost."""
        cost = self.construction_cost or 0

        if self.guarantee_type == "TRC":
            return min(max(cost * Decimal('0.01'), Decimal('20000')), Decimal('300000'))
        elif self.guarantee_type == "DO":
            return min(max(cost * Decimal('0.005'), Decimal('10000')), Decimal('300000'))
        elif self.guarantee_type == "DUO":
            return min(Decimal('30000'), Decimal('300000'))
        return Decimal('0')

    def save(self, *args, **kwargs):
        self.proposed_price = self.calculate_price()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.opportunity_number} - {self.client_name}"
