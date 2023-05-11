from flask import *
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
import json
import re

postalCodesFile = open('postal-codes.json', "r", encoding='UTF-8')
postalCodesData = json.load(postalCodesFile)


@app.route("/<postalCode>", methods=["GET"], strict_slashes=False)
def index(postalCode):
  response = []
  for regex in postalCodesData['postal-codes']:
    if re.match(regex["Regex"], postalCode):
      pais = {"pais":regex["Country"],
              "ISO":regex["ISO"]}
      response.append(pais)

  return response



if __name__ == "main":
  app.run(ssl_context="adhoc")
  app.config['CORS_HEADERS'] = 'Content-Type'