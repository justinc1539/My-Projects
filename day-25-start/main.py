# with open("weather_data.csv") as data:
#     data = data.readlines()
# print(data)
#
# import csv
#
# with open("weather_data.csv") as data:
#     data = csv.reader(data)
#     temperatures = []
#     for row in data:
#         if row[1].isnumeric():
#             temperatures.append(eval(row[1]))
#     print(temperatures)
#
import pandas

# data = pandas.read_csv("weather_data.csv")
# print(type(data["temp"]))
# print(type(data))
#
# data_dict = data.to_dict()
# print(data_dict)
#
# temp_list = data["temp"].to_list()
# print(temp_list)
# print(len(temp_list))
#
# # print(sum(temp_list) / len(temp_list))
# print(data["temp"].mean())
# print(data["temp"].max())
#
# # Get Data in Columns
# print(data["condition"])
# print(data.condition)
#
# # Get Data in Rows
# print(data[data.day == "Monday"])
# print(data[data.temp == data.temp.max()])
#
# monday = data[data.day == "Monday"]
# print(monday.condition)
# print(int(monday.iloc[0].temp) * 9 / 5 + 32)
#
# # Create a dataframe from scratch
# data_dict = {"students": ["Amy", "James", "Angela"], "scores": [76, 56, 65]}
# pandas.DataFrame(data_dict).to_csv("new_data.csv")

# The Great Squirrel Census Data Analysis
data = pandas.read_csv("2018_Central_Park_Squirrel_Census_-_Squirrel_Data.csv")
pandas.DataFrame({"Fur Color": ["gray", "cinnamon", "black"],
                  "Count": [len(data[data["Primary Fur Color"] == "Gray"]),
                            len(data[data["Primary Fur Color"] == "Cinnamon"]),
                            len(data[data["Primary Fur Color"] == "Black"])]}).to_csv("squirrel_count.csv")
