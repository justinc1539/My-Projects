# # Send Emails using SMTP
import smtplib
#
# email = "appbreweryinfo@gmail.com"
# password = "vexnarxlphojwuzh"
#
# with smtplib.SMTP("smtp.gmail.com") as connection:
#     connection.starttls()
#     connection.login(email, password)
#     connection.sendmail(email, "appbrewerytesting@yahoo.com", "Subject:Hello\n\nHave a good day.")
#
# email = "appbrewerytesting@yahoo.com"
# password = "fwviehfjewcjypkr"
#
# with smtplib.SMTP("smtp.mail.yahoo.com") as connection:
#     connection.starttls()
#     connection.login(email, password)
#     connection.sendmail(email, "appbreweryinfo@gmail.com", "Subject:Hello\n\nHave a good day.")
#
# # Working with date and time in Python
import datetime
#
# now = datetime.datetime.now()
# year = now.year
# month = now.month
# day_of_week = now.weekday()
#
# date_of_birth = datetime.datetime(1995, 12, 15, 4)

# Monday Motivation Project
import random

if datetime.datetime.now().weekday() == 0:
    with open("quotes.txt") as file:
        with smtplib.SMTP("smtp.gmail.com") as connection:
            connection.starttls()
            connection.login("appbreweryinfo@gmail.com", "abcd1234()")
            connection.sendmail("appbreweryinfo@gmail.com", "appbreweryinfo@gmail.com",
                                f"Subject:Have a good day.\n\n{random.choice(file.readlines())}")
