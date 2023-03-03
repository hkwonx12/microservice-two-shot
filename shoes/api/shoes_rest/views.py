from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Shoe, BinVO
# Create your views here.
class BinVoEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "bin_number",
        "bin_size",
        "import_href",
    ]

class ShoesListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "model_name",
        "manufacturer",
        "id",
        "color",
        "picture_URL",
        ]

class ShoesDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_URL",
    ]
    encoders = {
        "bin": BinVoEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoesListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            bin_href = f'/api/bins/{content["bin"]}/'
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin

        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoesDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_detail_shoes(request, pk):
    if request.method == "GET":
        try:
            shoe = Shoe.objects.get(id=pk)
            return JsonResponse(
                shoe,
                encoder=ShoesDetailEncoder,
                safe=False
            )
        except Shoe.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = Shoe.objects.filter(id=pk).delete()
            return JsonResponse({"delete": count > 0})
        except Shoe.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        content = json.loads(request.body)
        Shoe.objects.filter(id=pk).update(**content)

        try:
            shoe = Shoe.objects.get(id=pk)
            return JsonResponse(
                shoe,
                encoder=ShoesDetailEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            return JsonResponse(
                {"message": f"Invalid shoe id: {pk}"},
                status=400
            )
