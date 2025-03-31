# ### Birthday Wisher ### #

import datetime
import pandas
import random
import smtplib

today = datetime.datetime.now().month, datetime.datetime.now().day
birthdays = {(data.month, data.day): data for (_, data) in pandas.read_csv("birthdays.csv").iterrows()}
if today in birthdays:
    with open(f"letter_templates/letter_{random.randint(1, 3)}.txt") as file:
        with smtplib.SMTP("smtp.gmail.com") as connection:
            connection.starttls()
            connection.login("appbreweryinfo@gmail.com", "abcd1234()")
            connection.sendmail("appbreweryinfo@gmail.com",
                                birthdays[today].email,
                                f"Subject:Happy Birthday!\n\n{file.read().replace('[NAME]', birthdays[today]['name'])}")
