# WIP
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from time import sleep

driver = webdriver.Chrome()
driver.get("https://tinder.com/app/login")
sleep(2)
driver.find_element("css selector", '[aria-label="Log in with Facebook"]').click()
sleep(1)
driver.switch_to.window(driver.window_handles[1])
driver.find_element("id", "email").send_keys("pythonplaceholder@gmail.com")
driver.find_element("id", "pass").send_keys("pyth0nplaceholder@gmail.com" + Keys.ENTER)
driver.switch_to.window(driver.window_handles[0])
sleep(5)
driver.find_element("css selector", '[aria-label="Allow"]').click()
driver.find_element("css selector", '[aria-label="Not interested"]').click()
sleep(10)


def kid():
    try:
        driver.find_element("xpath",
                            '//*[@id="t--771258051"]/div/div[1]/div/main/div[1]/div/div/div[1]/div/div[2]/div[2]/button').click()
    except NoSuchElementException:
        kid()
    else:
        sleep(2)
        kid()


kid()
input()
