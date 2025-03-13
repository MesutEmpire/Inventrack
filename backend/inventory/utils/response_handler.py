from rest_framework.views import exception_handler

from .response import CustomResponse


def custom_exception_handler(exc, context):
    """
    Custom error handler to format API error responses.
    """
    response = exception_handler(exc, context)

    if response is not None:
        # Extract message from default exception response
        message = response.data.get('detail', 'An error occurred.')

        return CustomResponse(success=False, message=message, data=response.data, status_code=response.status_code)

    return response
