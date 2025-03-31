# ;APP_ID=3516055b;API_KEY=c8ec39e5c53fac7de6c280d709d2ae73;SHEET_ENDPOINT=https://api.sheety.co/3c80b24b33ebba7586e177bc2b96e445/myWorkouts/workouts;TOKEN=Bearer youcansuckmyfuckingpingasifyouseethis
import datetime
import requests
import os

h = {"x-app-id": os.environ["APP_ID"],
     "x-app-key": os.environ["API_KEY"]}
p = {"query": input("What exercises did you do?: "),
     "gender": "male",
     "weight_kg": 68,
     "height_cm": 165.1,
     "age": 14}
r = requests.post("https://trackapi.nutritionix.com/v2/natural/exercise", headers=h, json=p).json()

for exercise in r["exercises"]:
    data = {"workout": {"date": datetime.datetime.now().strftime("%d/%m/%Y"),
                        "time": datetime.datetime.now().strftime("%X"),
                        "exercise": exercise["name"].title(),
                        "duration": exercise["duration_min"],
                        "calories": exercise["nf_calories"]}}

    requests.post(os.environ["SHEET_ENDPOINT"], json=data,
                  headers={"Authorization": os.environ["TOKEN"]})
