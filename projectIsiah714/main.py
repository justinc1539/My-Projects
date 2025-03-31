# Therefore the Lord himself will give you a sign: behold, a virgin shall conceive, and bear a son, and shall call his name Immanuel
# https://genius.com/Christmas-songs-o-come-o-come-emmanuel-lyrics

from pynput.keyboard import Key, Controller
import time

keyboard = Controller()
stuff = '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789 -=[]\\;\',./_+{}|:"<>?'
passwd = []
for i in range(20):
    passwd.append(None)
    print('    ' * i + 'for ' + 'c' * (i + 1) + ' in stuff:\n' + '    ' * (i + 1) + 'passwd[' + str(i) + '] = ' + 'c' * (i + 1))


# keyboard.type('Hello, world!')
# time.sleep(1.5)
# keyboard.press(Key.enter)
# keyboard.release(Key.enter)
# keyboard.press(Key.ctrl)
# keyboard.press('a')
# keyboard.release('a')
# keyboard.release(Key.ctrl)

# import string
#
# all_characters = string.ascii_lowercase + string.ascii_uppercase + string.digits + string.punctuation
# print(all_characters)