from django.db import models
from django.conf import settings

# Create your models here.
class Category(models.Model):
    """Represent the category of inventory items"""
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)


    def __str__(self):
        return self.name

class Supplier(models.Model):
    """Represents suppliers providing inventory items."""
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    address = models.TextField(blank=True,null=True)



class Item(models.Model):

    """Represents individual inventory items."""
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category,on_delete=models.CASCADE,related_name='items')
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True, blank=True, related_name="items")
    quantity = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



    def __str__(self):
        return f"{self.name} - {self.quantity} in stock"

class StockMovement(models.Model):
    """Tracks stock movement (additions & removals)."""
    STOCK_IN = "IN"
    STOCK_OUT = "OUT"

    MOVEMENT_CHOICES = [
        (STOCK_IN, "Stock In"),
        (STOCK_OUT, "Stock Out"),
    ]

    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="movements")
    movement_type = models.CharField(max_length=3, choices=MOVEMENT_CHOICES)
    quantity = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.movement_type} {self.quantity} of {self.item.name}"
