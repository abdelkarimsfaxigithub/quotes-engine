from rest_framework import serializers
from .models import Quote

class QuoteSerializer(serializers.ModelSerializer):
    guarantee_type = serializers.SerializerMethodField()
    destination = serializers.SerializerMethodField()
    work_type = serializers.SerializerMethodField()
    opportunity_number = serializers.CharField(read_only=True)
    class Meta:
        model = Quote
        fields = '__all__'
        read_only_fields = ['proposed_price']
    def get_guarantee_type(self, obj):
        return obj.get_guarantee_type_display()

    def get_destination(self, obj):
        return obj.get_destination_display()

    def get_work_type(self, obj):
        return obj.get_work_type_display()