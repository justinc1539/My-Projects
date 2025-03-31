import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from time import sleep
from selenium.webdriver.common.keys import Keys

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    "Accept-Language": "en-US"}

soup = BeautifulSoup(
    requests.get(
        "https://www.zillow.com/homes/for_rent/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22mapBounds%22%3A%7B%22west%22%3A-122.64550246191406%2C%22east%22%3A-122.22115553808594%2C%22south%22%3A37.60467545777437%2C%22north%22%3A37.94551461358756%7D%2C%22mapZoom%22%3A11%2C%22isMapVisible%22%3Afalse%2C%22filterState%22%3A%7B%22price%22%3A%7B%22max%22%3A872627%7D%2C%22beds%22%3A%7B%22min%22%3A1%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22mp%22%3A%7B%22max%22%3A3000%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22fr%22%3A%7B%22value%22%3Atrue%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%7D",
        headers=headers).text,
    "html.parser")
a = soup.select(".property-card-link")
everything = [[_.text for _ in a if a.index(_) % 2 == 0],
              [_.text.split("+")[0].split("/")[0] for _ in soup.select(".iMKTKr")],
              ["https://www.zillow.com/" + _.get("href") for _ in a if a.index(_) % 2 == 0]]

input(everything)

driver = webdriver.Chrome()
for i in range(len(everything[1])):
    driver.get("https://forms.gle/LZtFHpBh7cekKc726")
    sleep(1)
    for _ in driver.find_elements("css selector", '[type="text"]'):
        _.send_keys(everything[driver.find_elements("css selector", '[type="text"]').index(_)][i])
    driver.find_element('xpath', '//span[text()="Submit"]').click()
driver.get("https://accounts.google.com")
driver.find_element("css selector", '[type="email"]').send_keys("pythonplaceholder@gmail.com" + Keys.ENTER)
sleep(5)
driver.find_element("css selector", '[type="password"]').send_keys("pyth0nplaceholder@gmail.com" + Keys.ENTER)
sleep(2)
# driver.get("https://docs.google.com/forms/d/1E0301zt5a2g1Uv33k9mS6g9OlziGN1yxnVvTl5uip0k/edit#responses")
# sleep(5)
# driver.find_element("xpath", '//span[text()="Link to Sheets"]').click()
driver.get("https://docs.google.com/spreadsheets/d/1xWLtLSh8FHPsPwFWrrvj8UC5_usa3fryG7HZ73CvBWI")
input()
