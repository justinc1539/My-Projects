import time, pyautogui, pydirectinput, random

pyautogui.hotkey('alt', 'tab')
pyautogui.hotkey('esc')

for i in range(300):
    pyautogui.hotkey(f'{random.randint(1, 9)}')

pyautogui.hotkey('t')
time.sleep(1)
pyautogui.hotkey('alt', 'tab')


# pyautogui.hotkey(*list('/tp 6'))
# pyautogui.hotkey(*list('61 127 7468'))
# pyautogui.hotkey('enter')
# time.sleep(1)
#
# a = 5
# for x in range(a):
#     for y in range(a):
#         for z in range(a):
#             pydirectinput.click(button='right')
#             pyautogui.hotkey('ctrl', 'a')
#             pyautogui.hotkey(*list(f'execute at @p if block ~{x} ~{y} ~{z} air unles'))
#             pyautogui.hotkey(*list(f's block ~{x} ~{y - 1} ~{z} air unles'))
#             pyautogui.hotkey(*list(f's block ~{x} ~{y - 1} ~{z} oak_but'))
#             pyautogui.hotkey(*list(f'ton run setblock ~{x} ~{y} ~{z} oak_but'))
#             pyautogui.hotkey(*list('ton[face=flo'))
#             pyautogui.hotkey(*list('or]'))
#             time.sleep(.1)
#             pyautogui.hotkey('enter')
#             time.sleep(.2)
#             pyautogui.hotkey('/')
#             time.sleep(.1)
#             pyautogui.hotkey(*list('tp ~ ~1 ~'))
#             time.sleep(.1)
#             pyautogui.hotkey('enter')

def ez():
    shulkercraft = {}
    docspel = {}
    used = []

    c = 1
    while c:
        c = input("shulkercraft: ")
        if c: c = c.split(" ");  shulkercraft[c[1]] = c[0]

    c = 1
    while c:
        c = input("docspel: ")
        if c: c = c.split(" "); docspel[c[1]] = c[0]

    for i in shulkercraft:
        try:
            print(f'{shulkercraft[i]} vs {docspel[i]} {i}')
        except:
            print(f"just shulkercraft {shulkercraft[i]} {i}")
        used.append(i)

    for i in docspel:
        if i not in used:
            print(f"just docspel {docspel[i]} {i}")
