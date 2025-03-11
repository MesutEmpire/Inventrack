from .models import Item,Category,StockMovement,Supplier
from rest_framework import serializers

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]


class StockMovementSerializer(serializers.ModelSerializer):
    item_name = serializers.ReadOnlyField(source="item.name")
    user_name = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = StockMovement
        fields = ["id", "item", "item_name", "movement_type", "quantity", "timestamp", "user", "user_username"]

    def validate_quantity(self, value):
        """Ensure quantity is greater than zero."""
        if value <= 0:
            raise serializers.ValidationError("Quantity must be greater than zero.")
        return value

    def validate_movement_type(self, value):
        """Ensure movement type is either 'IN' or 'OUT'."""
        if value not in ["IN", "OUT"]:
            raise serializers.ValidationError("Invalid movement type. Use 'IN' or 'OUT'.")
        return value

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields="__all__"

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields="__all__"