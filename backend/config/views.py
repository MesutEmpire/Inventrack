import os
from django.http import HttpResponse
from django.conf import settings

# def index(request):
#     index_path = os.path.join(settings.STATIC_ROOT, "index.html")  # Adjust path if needed
#     print(f'Path : {index_path}')
#     if not os.path.exists(index_path):
#         return HttpResponse("index.html not found in STATIC_ROOT", status=404)

#     with open(index_path, "r", encoding="utf-8") as f:
#         return HttpResponse(f.read())
def index(request, path=""):
    index_path = os.path.join(settings.STATICFILES_DIRS[0], "index.html")  # Use STATICFILES_DIRS
    if os.path.exists(index_path):
        with open(index_path, "r") as f:
            return HttpResponse(f.read(), content_type="text/html")
    return HttpResponse("index.html not found", status=404)