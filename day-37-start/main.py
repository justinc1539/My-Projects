import datetime
import requests

USERNAME = "angela"
TOKEN = "hjkh34h3jk4hj34h3jh4"
GRAPH_ID = "graph1"

e = "https://pixe.la/v1/users"
p = {"token": TOKEN,
     "username": USERNAME,
     "agreeTermsOfService": "yes",
     "notMinor": "yes"}
# r = requests.post(e, json=p)
# print(r.text)  # {"message":"Success.","isSuccess":true}

e = f"{e}/{USERNAME}/graphs"
p = {"id": GRAPH_ID,
     "name": "Cycling",
     "unit": "Km",
     "type": "float",
     "color": "ajisai"}
headers = {"X-USER-TOKEN": TOKEN}
# r = requests.post(e, json=p, headers=headers)

e = f"{e}/{GRAPH_ID}"
p = {"date": datetime.datetime.now().strftime("%Y%m%d"),
     "quantity": "100000000000000"}
# r = requests.post(e, json=p, headers=headers)

e = f"{e}/{datetime.datetime.now().strftime('%Y%m%d')}"
p = {"quantity": "100000000000000"}
# r = requests.put(e, json=p, headers=headers)

r = requests.delete(e, headers=headers)
