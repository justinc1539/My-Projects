import requests
from datetime import datetime
from time import sleep
import smtplib

MY_LAT = 40.058323
MY_LONG = -74.405663


def iss_overhead():
    response = requests.get("http://api.open-notify.org/iss-now.json")
    response.raise_for_status()
    data = response.json()

    iss_latitude = float(data["iss_position"]["latitude"])
    iss_longitude = float(data["iss_position"]["longitude"])

    if MY_LAT - 5 <= iss_latitude <= MY_LAT + 5 and MY_LONG - 5 <= iss_longitude:
        return True


def is_night():
    response = requests.get("https://api.sunrise-sunset.org/json", {"lat": MY_LAT, "lng": MY_LONG, "formatted": 0})
    response.raise_for_status()
    data = response.json()
    sunrise = int(data["results"]["sunrise"].split("T")[1].split(":")[0])
    sunset = int(data["results"]["sunset"].split("T")[1].split(":")[0])

    time_now = datetime.now().hour

    if time_now >= sunrise or time_now <= sunset:
        return True


while True:
    sleep(60)
    if iss_overhead() and is_night():
        with smtplib.SMTP("smtp.gmail.com") as connection:
            connection.starttls()
            connection.login("appbreweryinfo@gmail.com", "abcd1234()")
            connection.sendmail("appbreweryinfo@gmail.com", "appbreweryinfo@gmail.com",
                                "Subject:Look Up 👆\n\nThe ISS is above you in the sky.")
