from rest_framework import viewsets
from .serializers import ItemSerializer,StockMovementSerializer,CategorySerializer,SupplierSerializer
from .models import Item,StockMovement,Supplier,Category
from rest_framework.permissions import IsAuthenticated
from .utils.response import CustomResponse
from rest_framework import status
from rest_framework.views import APIView
from django.db.models import Sum
from datetime import datetime, timedelta
from django.shortcuts import render


class ItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing inventory items.
    """
    queryset = Item.objects.select_related('supplier', 'category').order_by('-created_at')
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return CustomResponse(
                success=True,
                message="Items retrieved successfully",
                data=serializer.data,
                status_code=status.HTTP_200_OK
            )

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return CustomResponse(
            success=True,
            message="Item retrieved successfully",
            data=serializer.data,
            status_code=status.HTTP_200_OK
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return CustomResponse(
                success=True,
                message="Item created successfully",
                data=serializer.data,
                status_code=status.HTTP_201_CREATED
            )
        return CustomResponse(
            success=False,
            message="Validation failed",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return CustomResponse(
                success=True,
                message="Item updated successfully",
                data=serializer.data,
                status_code=status.HTTP_200_OK
            )
        return CustomResponse(
            success=False,
            message="Validation failed",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return CustomResponse(
                success=True,
                message="Item partially updated successfully",
                data=serializer.data,
                status_code=status.HTTP_200_OK
            )
        return CustomResponse(
            success=False,
            message="Validation failed",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return CustomResponse(
            success=True,
            message="Item deleted successfully",
            status_code=status.HTTP_204_NO_CONTENT
        )





class StockMovementViewSet(viewsets.ModelViewSet):
    """
      API endpoint for tracking stock movements (Stock In & Stock Out).
      """
    queryset = StockMovement.objects.all().order_by('-timestamp')
    serializer_class = StockMovementSerializer
    permission_classes = [IsAuthenticated]

class SupplierViewSet(viewsets.ModelViewSet):
    """
      API endpoint for suppliers
      """
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return CustomResponse(
                success=True,
                message="Items retrieved successfully",
                data=serializer.data,
                status_code=status.HTTP_200_OK
            )

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return CustomResponse(
            success=True,
            message="Item retrieved successfully",
            data=serializer.data,
            status_code=status.HTTP_200_OK
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return CustomResponse(
                success=True,
                message="Item created successfully",
                data=serializer.data,
                status_code=status.HTTP_201_CREATED
            )
        return CustomResponse(
            success=False,
            message="Validation failed",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return CustomResponse(
                success=True,
                message="Item updated successfully",
                data=serializer.data,
                status_code=status.HTTP_200_OK
            )
        return CustomResponse(
            success=False,
            message="Validation failed",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return CustomResponse(
            success=True,
            message="Item deleted successfully",
            status_code=status.HTTP_204_NO_CONTENT
        )


class CategoryViewSet(viewsets.ModelViewSet):
    """
      API endpoint for categories.
      """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return CustomResponse(
                success=True,
                message="Items retrieved successfully",
                data=serializer.data,
                status_code=status.HTTP_200_OK
            )

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return CustomResponse(
            success=True,
            message="Item retrieved successfully",
            data=serializer.data,
            status_code=status.HTTP_200_OK
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return CustomResponse(
                success=True,
                message="Item created successfully",
                data=serializer.data,
                status_code=status.HTTP_201_CREATED
            )
        return CustomResponse(
            success=False,
            message="Validation failed",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return CustomResponse(
                success=True,
                message="Item updated successfully",
                data=serializer.data,
                status_code=status.HTTP_200_OK
            )
        return CustomResponse(
            success=False,
            message="Validation failed",
            data=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )

    def destroy(self, request, *args, **kwargs):
        """Override delete to support bulk deletion"""
        item_id = kwargs.get('pk')
        if item_id:
            return super().destroy(request, *args, **kwargs)

        item_ids = request.data.get("ids", [])  # Expecting a list of item IDs in request body
        if not item_ids:
            return CustomResponse(success=False, message="No item IDs provided", status_code=status.HTTP_400_BAD_REQUEST)

        items = Item.objects.filter(id__in=item_ids)
        deleted_count, _ = items.delete()

        return CustomResponse(success=True, message=f"{deleted_count} item(s) deleted", status_code=status.HTTP_200_OK)


class DoughnutChartView(APIView):
    """Returns data for the Doughnut Chart (Category distribution)."""

    def get(self, request, *args, **kwargs):
        categories = Item.objects.values('category__name').annotate(total_quantity=Sum('quantity'))

        labels = [category['category__name'] for category in categories]
        data = [category['total_quantity'] for category in categories]

        response_data = {"labels": labels, "data": data}
        return CustomResponse(success=True,message="Category distribution retrieved successfully", data=response_data)

class LineChartView(APIView):
    """Returns stock movement data over time for all inventory items."""

    def get(self, request, *args, **kwargs):
        # Get the last 30 days of stock movements
        start_date = datetime.now() - timedelta(days=30)
        movements = (
            StockMovement.objects.filter(timestamp__gte=start_date)
            .values('item_id', 'item__name', 'timestamp__date')
            .annotate(total_movement=Sum('quantity'))
            .order_by('timestamp__date')
        )

        # Organizing data by item
        item_data = {}
        labels_set = set()

        for entry in movements:
            item_id = entry["item_id"]
            item_name = entry["item__name"]
            date = entry["timestamp__date"].strftime("%Y-%m-%d")
            total_movement = entry["total_movement"]

            labels_set.add(date)

            if item_id not in item_data:
                item_data[item_id] = {
                    "name": item_name,
                    "data": {}
                }

            item_data[item_id]["data"][date] = total_movement

        # Ensure all items have data for all dates
        labels = sorted(labels_set)  # Ensure dates are in order
        datasets = []

        for item_id, item in item_data.items():
            dataset = {
                "label": item["name"],
                "data": [item["data"].get(date, 0) for date in labels]  # Fill missing dates with 0
            }
            datasets.append(dataset)

        response_data = {
            "labels": labels,
            "datasets": datasets
        }

        return CustomResponse(success=True, message="Stock movement data retrieved successfully", data=response_data)