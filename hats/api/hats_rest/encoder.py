from .models import LocationVO, Hats
from api.common.json import ModelEncoder


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
        "fabric", "style_name", "color","picture_url", "id"
    ]