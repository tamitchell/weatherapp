import requests
from pprint import pprint
import json


def getAPIURL(lat, lng):
    key = '827cb0f86be6d0f872e35b6151c99e6c'
    url = 'https://api.darksky.net/forecast/%s/%s,%s'
    return url % (key, lat, lng)
    
req = requests.get(getAPIURL(37.8267, -122.4233))
print(type(req.content))
readable_content = json.loads(req.content)
pprint(readable_content)
