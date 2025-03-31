from bs4 import BeautifulSoup
import requests

with open("website.html", encoding="utf8") as file:
    soup = BeautifulSoup(file.read(), "html.parser")

# print(soup.title)
# print(soup.title.string)

# print(soup.prettify())  # Add indentation

# print(soup.p)  # Get the first tag using .[tagname] (Ex. soup.p for first paragraph)

all_anchor_tags = soup.find_all("a")  # Create a list of all occurances of a tag

# for tag in all_anchor_tags:
#     print(tag.getText())  # getText() gets the text in a tag
#     print(tag.get("href"))  # get() can get the value of a tag attribute

# print(soup.find("h1", id="name"))  # find() gets the first occurance of a tag
section_heading = soup.find("h3", class_="heading")
# print(section_heading.getText())
# print(section_heading.name)
# print(section_heading.get("class"))

# You can also find by using a CSS Selector:
# print(soup.select_one("#name"))
# print(soup.select(".heading"))

soup = BeautifulSoup(requests.get("https://news.ycombinator.com/news").text, "html.parser")
tag = soup.select(".titleline a")
tag = [_ for _ in tag if tag.index(_) % 2 == 0]
text = [tag.text for tag in tag]
link = [tag.get("href") for tag in tag]
upvote = [int(tag.text.split()[0]) for tag in soup.select(".score")]
max_index = upvote.index(max(upvote))
print(text[max_index], link[max_index])
