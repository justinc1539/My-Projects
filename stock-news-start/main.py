import requests
from twilio.rest import Client

STOCK_NAME = "TSLA"
COMPANY_NAME = "Tesla Inc"

STOCK_ENDPOINT = "https://www.alphavantage.co/query"
NEWS_ENDPOINT = "https://newsapi.org/v2/everything"
ALPHA_KEY = ""
NEWS_KEY = ""

# STEP 1: Use https://www.alphavantage.co/documentation/#dailyadj
# When stock price increase/decreases by 5% between yesterday and the day before yesterday then print("Get News").

response = requests.get(STOCK_ENDPOINT,
                        {"function": "TIME_SERIES_DAILY_ADJUSTED", "symbol": STOCK_NAME, "apikey": ALPHA_KEY})
data_list = [_ for (key, _) in response.json()["Time Series (Daily)"].items()]
yesterday_close = eval(data_list[0]["4. close"])

diff = yesterday_close - eval(data_list[1]["4. close"])
if diff > 0:
    change = "🔺"
else:
    change = "🔻"
diff_percent = abs(round(diff / yesterday_close * 100))

if True:#diff_percent > 5:
    print("Get News")

# STEP 2: https://newsapi.org/
# Instead of printing ("Get News"), get the first 3 news pieces for the COMPANY_NAME.

    articles = requests.get(NEWS_ENDPOINT, {"qInTitle": COMPANY_NAME, "language": "en", "apiKey": NEWS_KEY}).json()
    articles = articles["articles"][:3]


# STEP 3: Use https://twilio.com/docs/sms/quickstart/python/
# to send a separate message with each article's title and description to your phone number.

# TODO 8. - Create a new list of the first 3 article's headline and description using list comprehension.
    articles = [(item["title"], item["description"]) for item in articles]

# TODO 9. - Send each article as a separate message via Twilio.
    client = Client("", "")
    for article in articles:
        print(f"{STOCK_NAME}: {change}{diff_percent}%\nHeadline: {article[0]}\nBrief: {article[1]}")
        # Apparently all the weird <> symbols and all of that is so the mobile device can process it correctly.
        message = client.messages.create(
            body=f"{STOCK_NAME}: {change}{diff_percent}%\nHeadline: {article[0]}\nBrief: {article[1]}",
            from_="YOUR TWILIO VIRTUAL NUMBER",
            to="YOUR TWILIO VERIFIED REAL NUMBER"
        )

# Optional TODO: Format the message like this:
"""
TSLA: 🔺2%/🔻5%
Headline: Were Hedge Funds Right About Piling Into Tesla Inc. (TSLA)?.
Brief: We at Insider Monkey have gone over 821 13F filings that hedge funds and prominent investors are required to file by the SEC The 13F filings show the funds' and investors' portfolio positions as of March 31st, near the height of the coronavirus market crash.
"""
