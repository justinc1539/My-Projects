from selenium import webdriver

# from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()
# driver.get("https://www.amazon.com/dp/B07W55DDFB")
# print(driver.find_element("class name", "a-price").text)

# driver.get("https://www.python.org")
# print(driver.find_element("name", "q").get_attribute("placeholder"))
# print(driver.find_element("class name", "python-logo").size)
# print(driver.find_element("css selector", ".documentation-widget a").text)
# print(driver.find_element("xpath", '//*[@id="site-map"]/div[2]/div/ul/li[3]/a').text)
# titles = [_.text for _ in driver.find_elements("css selector", ".event-widget li a")]
# times = [_.text for _ in driver.find_elements("css selector", ".event-widget time")]
# why = {}
# for _ in range(len(times)):
#     why[_] = {"time": times[_], "name": titles[_]}
# yes = [{"time": times[_], "name": titles[_]} for _ in range(len(times))]
# print(why)
# print(yes)

# driver.get("https://en.wikipedia.org/wiki/Main_Page")
# driver.find_element("css selector", "#articlecount a").click()

# search = (driver.find_element("name", "search"))
# search.send_keys("Python" + Keys.ENTER)

# driver.get("https://secure-retreat-92358.herokuapp.com")
# driver.find_element("name", "fName").send_keys("a")
# driver.find_element("name", "lName").send_keys("b")
# driver.find_element("name", "email").send_keys("c@mail.com" + Keys.ENTER)

driver.get("https://orteil.dashnet.org/experiments/cookie")
driver.find_element("id", "toggleNumbers").click()
driver.find_element("id", "toggleFlash").click()
items = ["buyCursor", "buyGrandma", "buyFactory", "buyMine", "buyShipment", "buyAlchemy lab", "buyPortal", "buyTime "
                                                                                                           "machine"]


def eternal(frame=0):
    while frame < 300:
        frame += 1
        driver.find_element("id", "cookie").click()
    prices = [eval(
        driver.find_element("xpath", f'//*[@id="{item}"]').text.split("- ")[1].split("\n")[0].replace(",", "")) for item
                 in items][::-1]
    for price in prices:
        if price < eval(driver.find_element("id", "money").text.replace(",", "")):
            driver.find_element("xpath", f'//*[@id="{items[::-1][prices.index(price)]}"]').click()
            break
    eternal()


eternal()
# input("u done?")
