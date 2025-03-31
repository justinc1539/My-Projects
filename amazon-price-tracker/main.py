import smtplib
import requests
from bs4 import BeautifulSoup

URL = "https://www.amazon.com/dp/B075CYMYK6"
soup = BeautifulSoup(requests.get(URL, headers={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/115.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9"}).text, "lxml")
cost = eval(soup.select_one("span span .a-offscreen").text.split("$")[1])
if 100 > cost:
    with smtplib.SMTP("smtp.gmail.com") as connection:
        connection.starttls()
        connection.login("appbreweryinfo@gmail.com", "abcd1234()")
        connection.sendmail("appbreweryinfo@gmail.com", "appbreweryinfo@gmail.com",
                            "Subject:Amazon Price Alert!\n\n"
                            f"{soup.find(id='productTitle').text.strip()} is now ${cost}\n{URL}")
