from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from hats_rest.models import Hats, LocationVO
from django.http import JsonResponse
from common.json import ModelEncoder
import json
# Create your views here.
class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href",
        "closet_name",
        "section_number",
        "shelf_number",
    ]

class HatsDetailEncoder(ModelEncoder):
    model = Hats
    properties = [
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location",
    ]
    encoders = {
        "location": LocationVOEncoder(),
    }


class HatsListEncoder(ModelEncoder):
    model = Hats
    properties = [
        "style_name", "id",
    ]


@require_http_methods(["GET", "POST"])
def api_list_hats(request):
    if request.method == "GET":
        hats = Hats.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatsListEncoder,
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            href = f'/api/locations/{content["location"]}/'
            print(LocationVO.objects.all())
            location= LocationVO.objects.get(import_href=href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Location"}, status=400,)

        hat=Hats.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatsDetailEncoder,
            safe=False,
        )



@require_http_methods(["DELETE", "GET", "PUT"])
def api_detail_hat(request, pk):

    if request.method == "GET":
        try:
            hat = Hats.objects.get(id=pk)
            return JsonResponse(
                hat,
                encoder=HatsDetailEncoder,
                safe=False
            )
        except Hats.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = Hats.objects.filter(id=pk).delete()
            return JsonResponse(
            {"delete": count>0}
            )
        except Hats.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        content = json.loads(request.body)
        Hats.objects.filter(id=pk).update(**content)
        try:
            hat = Hats.objects.get(id=pk)
            return JsonResponse(
                hat,
                encoder=HatsDetailEncoder,
                safe=False,
            )
        except Hats.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
