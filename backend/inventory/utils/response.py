from rest_framework.response import Response


class CustomResponse(Response):
    def __init__(self, success=True, message="", data=None, status_code=200, **kwargs):
        response_data = {"status": success, "message": message, "data": data}
        super().__init__(response_data, status=status_code, **kwargs)
