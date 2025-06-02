import selenium.common.exceptions
from pynput.keyboard import Key, Controller as kc
from pynput.mouse import Button, Controller as mc
import time, pyperclip as pc, pyautogui as pg

k = kc()
m = mc()

# print("GOGOGO")
# for i in range(50):
#     time.sleep(2)
#     pg.hotkey('ctrl', 'a')
#     pg.hotkey('ctrl', 'c')
#     print(pc.paste())
#     try:
#         iter = str(eval(pc.paste()[7:9]))
#     except SyntaxError:
#         iter = pc.paste()[8]
#     k.type("\t\t")
#     pg.hotkey('backspace')
#     k.type("(20.36,29.7)\t6.145\t\t6.27\t")
#     pg.hotkey('backspace')
#     k.type("{d_t=" + iter + ":1,0}")
#     if i != 50: k.type("\t\t\t")

import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from time import sleep

# Badge Searcher
# for user in [441560575, 100205716, 52342244, 30819950, 514717201, 110877521]:
#     driver = webdriver.Chrome()
#     driver.get(f'https://www.roblox.com/users/{user}/inventory/#!/badges')
#     while 1:
#         for i in range(3, 0, -1):
#             # print(i)
#             time.sleep(1)
#         try:
#             driver.find_element("css selector", '[title="Goober Mode"]')  # Find result here
#         except selenium.common.exceptions.NoSuchElementException:
#             # print("nope")
#             try:
#                 driver.find_element("css selector", '[class="btn-generic-right-sm"]').click()
#             except selenium.common.exceptions.ElementClickInterceptedException:
#                 print(f"that's everything from {user}")
#                 time.sleep(1)
#                 break
#         else:
#             driver.quit()
#             driver = webdriver.Chrome()
#             driver.get("https://google.com/?q=THEY%20HAVE%20IT!!!")
#             input(f"caught! {user}")
#             break

# AutoCloser
# driver = webdriver.Chrome()
# driver.get(f'')
# while 1:
#     try:
#         driver.find_element('css selector', '[data-element="close-button"]').click()
#     except (selenium.common.exceptions.ElementClickInterceptedException,
#             selenium.common.exceptions.NoSuchElementException):
#         pass
#     try:
#         driver.execute_script('document.getElementsByClassName("picture-card-like-buttons-hover")[0].remove();')
#     except selenium.common.exceptions.JavascriptException:
#         pass


def key_type(wpm, text: str):
    """Args:
        wpm: The required speed (assuming one word is 5 chars)
        text: The text to type

    Time to type = 60/wpm/characters_that_make_one_word (typically 5)"""
    delay = 12/wpm
    input(f'This will take {delay*len(text)} seconds. (Press enter to continue)')
    for i in range(3, 0, -1):
        print(f'{i}...')
        time.sleep(1)
    for char in text:
        time.sleep(delay)
        pg.hotkey('shift', char) if char.isupper() else k.type(char)


# pg.hotkey('ctrl', 'a')
a = '''Social media is a form of online communication using Web-based tools such as blogs, social networking sites, online communities, and virtual game worlds. Users can send messages and share pictures, news, and status updates with friends, family, and even strangers. Social media tools, such as Facebook and Twitter, have drastically changed how we communicate. The World Wide Web has opened a cyber sphere so big that the social media tools available are endless. Social media keeps people connected and up to date on what is happening in the world.
The use of social media tools makes interacting in real time possible without actually being face-to-face with another person. Even a friend home sick can experience the excitement of a homecoming game through tweets, status updates, and photo sharing without actually being at the game in person. Businesses also use social media to reach customers and many people rely on social media for real-time news.
Social networking allows us to connect to others online through status updates, wall posts, and sharing pictures and videos. These sites are formed around user profiles, allowing users to share information like favorite movies or music. Blogging is like an online journal. Bloggers can write about a trip they took, day-to-day life, or offer advice on different topics. Many blogs are public, though some may require registration to read.
We use social media primarily for personal, academic, and professional purposes. Social media offers convenience for many personal uses. These may include writing a blog, chatting with friends who live far away, or keeping friends updated by status posts on websites like Facebook. Social media is a powerful tool when it comes to academics and research. From Googling information for a report to researching websites, social media puts the world at our fingertips in seconds. Social media isn't only for fun and school; it also has professional uses such as networking or product advertising or endorsement. Social media provides a platform for creative expression and exchange of ideas.
Overuse of social media websites can have a negative effect on real-life relationships. Sometimes using social media sources can become more important than investing time in everyday relationships with friends and family. It can cause personal relationships to deteriorate and result in someone valuing online connections more than face-to-face connections. The Internet allows people to be anonymous, giving them freedom to post hurtful comments without assuming responsibility. Use of social media for cyber bullying is dangerous because it can spread negative messages quickly.
Sharing too much personal information puts people at risk. Revealing personal information online, such as a home address or online passwords, is dangerous and can allow people to hack into personal accounts, gain access to financial information, or send messages under a stolen identity. Posting inappropriate pictures or comments may be seen by prospective employers. As with any online communication, social media should be used with caution and responsibility.'''  # Social Media Today
b = '''In order to be a successful student, you have to develop many different types of study skills. From studying, taking notes and tests, managing your time, or simply getting organized, it is important to develop these skills early in your academic career.
When studying, you should first find a quiet place where you can concentrate on your homework. Sit in a comfortable chair and avoid distractions like the television or telephone. If you study with a group of friends, compare notes and ask each other questions. To help you remember information easily, relate what you are studying to things you already know. Plan to spend more time on subjects that are harder for you, and get into the habit of studying every day.
To help you organize and learn new material, use outlines, charts, or flashcards. Try creating a planner to keep track of homework assignments, tests, and projects, and get into the habit of writing in your planner every day. Besides a planner, keep a "To Do" list to write down things you need to do. Then decide what you need to get done right away and what can wait until later. One final tip to keep you organized is to use separate notebooks and folders for each different subject you are studying.
Once you determine what needs to be done now and what can wait until later, plan ahead and commit to a schedule. Do not put off things to the last minute. Decide what you want to accomplish and how long you will spend on each subject or assignment. So that you don't become overwhelmed, you may find it helpful to break your workload down into manageable chunks.
Finally, to better manage your stress, don't sweat the small stuff. Prioritize your activities and focus on the most important ones. To take your mind off things that are bothering you, go for a walk, or hit the gym. Aside from all of your studies, take care of yourself. Don't forget about eating right and getting enough sleep. Neglecting this will negatively impact you both in and out of the classroom.'''  # Study Skills for Success!
c = '''Suppose your cousin is getting married in London this summer. The first thing to get before you plan a trip out of the country is your passport. A passport is a travel document that certifies the identity and nationality of its holder for the purpose of traveling internationally. A person's passport specifies their nationality, but it does not identify their citizenship or place of residence. Most countries allow entry to holders of a passport of another country. Some countries require a visa in addition to a passport for entry. A passport can be used as a proof of identity, unrelated to travel.
Although King Henry V of England is recognized as having invented the first true passport, the concept was around for hundreds of years before him. Travelers in ancient times needed safe passage papers to travel to different lands. In medieval times proof of payment of a tax was required to travel to different regions. The twentieth century eventually brought passport guidelines and a standard booklet design resulting from a worldwide conference held in Paris.
You need a passport to enter and return to the U.S. from any other country. When entering the U.S. from Canada, Mexico, the Caribbean, and Bermuda at land border crossings or seaports of entry, a U.S. passport card can be used. The passport card is more convenient and less expensive than a passport book, but the card cannot be used for international travel by air.
Obtaining a U.S. passport is not complicated as long as you follow the instructions provided by the State Department on their website. An official passport application must be submitted along with proof of U.S. citizenship in the form of an official U.S. birth certificate or other acceptable form of proof. Two regulation photos must be provided along with the applicant's Social Security number and a check for the required fee. It can take up to two months to get a passport, so be sure to allow enough time before your trip. The process can be expedited for a fee.
When traveling out of the country it is a good idea to leave a copy of your passport at home and bring another copy along in case the passport book gets lost or stolen. This will make it easier to get a replacement. In the case of a lost or stolen passport while abroad, the first thing to do is contact the closest U.S. embassy or consulate. You will have to appear in person in order to get a replacement to return home. Be prepared, follow the rules, and most of all, enjoy the trip!'''  # Passport to the World
d = '''The Internet is a digital world at our fingertips, just brimming with information waiting to be discovered. The Internet makes it possible for people around the world to connect and share ideas across time zones and geographical locations. It can sometimes be difficult to find the information you need. So, the most effective way to explore the Internet is to have strategies in place for doing research on the Web and for evaluating the websites you find there.
When you surf the Web, you should always keep search, strategy and safety in mind. Smart strategies will help you conduct efficient searches and focus on safety will help protect you from online threats. One tool we can use to find something on the Internet is called a search engine, a tool that helps us wade through the billions of websites to locate only those that are specific to the search.
It is important to use accurate keywords in order to create an efficient search, or a search that finds the most relevant and credible information specific to the subject. If you use vague or unrelated keywords, the search will take longer, and it will become more difficult to find the information you need. When looking for information on the Web, it may help to conduct a Boolean search, in which you use logical operators to connect words. The most common Boolean operators are and, or, and not.
When you are researching something on the Web, begin with research questions. These can include questions you have about a subject and what you want to learn. Extract, or take out, keywords from your research questions as a starting point for what to type into a search engine. If research question keywords do not give you the results you're looking for, type in synonyms or other alternative word choices and search again. Keep track of what keywords you use so that you don't repeat the same search.
With so many websites to explore, there is no doubt that surfing the Web can be a fun adventure. We can stay safe in the cyber world by being cautious and using common sense about what information we share online and which websites we visit. Carefully evaluate the information you uncover online. Consider the credibility, or trustworthiness and reliability, of the content before taking it as the truth. Just because something is online doesn't make it true; don't believe everything you read.
To avoid plagiarizing someone else's work, take detailed notes while conducting your research, and record citations for your sources and indicate which of your notes go with which of your sources. Read all your sources and then put them aside as you write your own paper. This way, you will be less likely to use the wording that your sources used. You will be more likely to synthesize the information from your sources and put it in your own words.'''  # Internet Research
# key_type(96, d)

# m.position = (432, 743)
# m.click(Button.left, 2)

import screen_ocr

# Create a reader object
reader = screen_ocr.Reader()

# Capture the screen and perform OCR
result = reader.read_screen()

# Access the recognized text
print(result.text)
