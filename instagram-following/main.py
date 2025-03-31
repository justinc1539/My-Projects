# WIP
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from time import sleep


class InstaFollower:
    def __init__(self):
        self.driver = webdriver.Chrome()
        self.driver.get(
            "https://www.facebook.com/login.php?skip_api_login=1&api_key=124024574287414&kid_directed_site=0&app_id"
            "=124024574287414&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Foauth%3Fclient_id"
            "%3D124024574287414%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.instagram.com%252Faccounts"
            "%252Fsignup%252F%26response_type%3Dcode%252Cgranted_scopes%26scope%3Demail%26state%3D%257B"
            "%2522fbLoginKey%2522%253A%252210wrhljq52kc3yg2vmyt7ldttfd1e52y7cnxe1wthezk13m11m8%2522%252C"
            "%2522fbLoginReturnURL%2522%253A%2522%252Ffxcal%252Fdisclosure%252F%253Fnext%253D%25252F%2522%257D%26ret"
            "%3Dlogin%26fbapp_pres%3D0%26logger_id%3D7a191bb0-fceb-4dc5-a2b7-53069c33f4a1%26tp%3Dunspecified"
            "&cancel_url=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fsignup%2F%3Ferror%3Daccess_denied%26error_code"
            "%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3D%257B"
            "%2522fbLoginKey%2522%253A%252210wrhljq52kc3yg2vmyt7ldttfd1e52y7cnxe1wthezk13m11m8%2522%252C"
            "%2522fbLoginReturnURL%2522%253A%2522%252Ffxcal%252Fdisclosure%252F%253Fnext%253D%25252F%2522%257D%23_"
            "%3D_&display=page&locale=en_US&pl_dbl=0")

    def login(self):
        self.driver.find_element("id", "email").send_keys("pythonplaceholder@gmail.com")
        self.driver.find_element("id", "pass").send_keys("pyth0nplaceholder@gmail.com" + Keys.ENTER)
        sleep(10)
        try:
            self.driver.find_element("xpath", '/html/body/div[2]/div/div/div[2]/div/div/div/div['
                                              '1]/section/main/article/div[2]/div/div[2]/div[2]/button').click()
        except NoSuchElementException:
            print("welp")
        else:
            print('yes?')

    def find_followers(self):
        self.driver.get("https://instagram.com/chefsteps/followers")
        # sleep(2)
        # for _ in range(10):
        #     self.driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight",
        #                                self.driver.find_element("xpath", '/html/body/div[2]/div/div/div['
        #                                                                  '3]/div/div/div[1]/div/div['
        #                                                                  '2]/div/div/div/div/div[2]/div/div/div[3]'))
        #     sleep(2)

    def follow(self):
        [_.click() for _ in self.driver.find_elements("css selector",
                                                      'div div div div div div div div div div div div div div div div div div div div div div div div button')]


instafollower = InstaFollower()
instafollower.login()
instafollower.find_followers()
instafollower.follow()
