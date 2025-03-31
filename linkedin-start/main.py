from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from time import sleep

URL = ("https://www.linkedin.com/login?emailAddress=&fromSignIn=&fromSignIn=true&session_redirect=https%3A%2F%2Fwww"
       ".linkedin.com%2Fjobs%2Fsearch%2F%3Ff_LF%3Df_AL%26geoId%3D102257491%26keywords%3Dpython%2520developer"
       "%26location%3DLondon%252C%2520England%252C%2520United%2520Kingdom%26redirect%3Dfalse%26position%3D1%26pageNum"
       "%3D0&trk=public_jobs_nav-header-signin")

driver = webdriver.Chrome()
driver.get(URL)
driver.find_element("id", "username").send_keys("justinc1539@gmail.com")
driver.find_element("id", "password").send_keys("veslta@pl5ATlinkedin" + Keys.ENTER)
sleep(1)
driver.find_element("xpath", '/html/body/div[5]/div[3]/div[4]/div/div/main/div/div[2]/div/div[2]/div[1]/div/div['
                             '1]/div/div[1]/div[1]/div[4]/div/div/div/button').click()
driver.find_element("id", "single-line-text-form-component-formElement-urn-li-jobs-applyformcommon"
                          "-easyApplyFormElement-3656983339-720017503049330542-phoneNumber-nationalNumber"
                          "").send_keys("123-456-789")
# i ain't sending no applications today!
