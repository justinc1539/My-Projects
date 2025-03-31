from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from time import sleep


class InternetSpeedTwitterBot:
    def __init__(self):
        self.driver = webdriver.Chrome()
        self.up = 0
        self.down = 0

    def get_internet_speed(self):
        self.driver.get("https://speedtest.net")
        self.driver.find_element("css selector", ".start-button a").click()
        while True:
            try:
                speeds = [float(_.text) for _ in self.driver.find_elements("css selector", ".result-data-large")]
            except ValueError:
                pass
            else:
                self.down = speeds[1]
                self.up = speeds[0]
                break

    def tweet_at_provider(self):
        self.driver.get("https://twitter.com/i/flow/login?redirect_after_login=%2Fcompose%2Ftweet")
        sleep(2)
        self.driver.find_element("name", "text").send_keys("pythonplaceholder@gmail.com" + Keys.ENTER)
        sleep(1)
        try:
            self.driver.find_element("name", "password").send_keys("pyth0nplaceholder@gmail.com" + Keys.ENTER)
        except NoSuchElementException:
            self.driver.find_element("name", "text").send_keys("ArchibaldHall69" + Keys.ENTER)
            sleep(1)
            self.driver.find_element("name", "password").send_keys("pyth0nplaceholder@gmail.com" + Keys.ENTER)
        sleep(5)
        self.driver.find_element("css selector", '[role="textbox"]').send_keys(f"Up: {istb.up}, Down: {istb.down}")
        self.driver.find_element("css selector", '[data-testid="tweetButton"]').click()


istb = InternetSpeedTwitterBot()
istb.get_internet_speed()
istb.tweet_at_provider()
