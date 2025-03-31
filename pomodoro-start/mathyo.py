# from tkinter import *
# import math, random
#
# PINK = "#e2979c"
# RED = "#e7305b"
# GREEN = "#9bdeac"
# YELLOW = "#f7f5dd"
# FONT_NAME = "Courier"
# subscripts = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]
# current = 0
# cards = {"baby": 3, "easy": 3, "normal": 5, "hard": 10, "AI": 20}
# times = {"baby": (120, 180), "easy": (30, 60), "normal": (5, 20), "hard": (2, 10), "AI": (1, 1)}
# nums = {"baby": [(1, 10), (1, 10)], "easy": [(1, 20), (1, 20), (2, 4)], "normal": [(1, 40), (1, 40), (0, 5), (2, 5)],
#         "hard": [(-40, 50), (-40, 50), (-1, 8), (2, 8), (2, 3), (2, 3)],
#         "AI": [(-200, 200), (-200, 200), (-9, 9), (2, 9), (0.25, 5), (2, 5)]}
# opers = {"baby": ["+", "-"], "easy": ["+", "-", "*"], "normal": ["+", "-", "*", "/"],
#          "hard": ["+", "-", "*", "/", "^", "√"], "AI": ["+", "-", "*", "/", "^", "√"]}
# diff = "easy"  # input("Select a difficulty [baby, easy, normal, hard, AI]: "); cards[diff]
# title, canvas, timer_label, window, textbox, buttons = None, None, None, None, None, None
#
#
# def start(event):
#     globals()["event"] = event
#     title_text, event_text = title.cget("text"), event.widget.cget("text")
#     # for oper in opers["AI"]:
#     #     print(oper, current_card, not bool(current_card), (oper not in title_text[1:] if "-" in title_text[0] else oper not in title_text))
#     if all([event_text and (oper not in title_text[1:] if "-" in title_text[0] else oper not in title_text) for oper in
#             opers["AI"]]):
#         globals()["current_card"] = event_text[:-1].split(" (")
#         title.config(text=f"{current}{current_card[0]}")
#         print(f"{current}{current_card[0]}=", end="")  # delete
#         event.widget.config(text="")
#         countdown(2)
#
#
# def countdown(count):
#     global timer, event
#     secs, mins = int(count % 60), math.floor(count / 60)
#     if count % 60 < 10:
#         secs = f"0{secs}"
#     if mins < 10:
#         mins = f"0{mins}"
#     canvas.itemconfig(timer_label, text=f"{mins}:{secs}", font=(FONT_NAME, 35, "bold"))
#     if count > 0:
#         timer = window.after(1000, countdown, count - 1)
#     else:
#         check()
#
#
# def check():
#     global current, current_card, event
#     if canvas.itemcget(timer_label, "text") != "Waiting on player...":
#         window.after_cancel(timer)
#         print(f'{textbox.get("1.0", "end-1c")}?')  # delete
#         print(f"{current}{current_card[0]}={eval(f'{current}{current_card[0]}')}")  # delete
#         current = eval(f"{current}{current_card[0]}")
#         try:
#             correct = eval(textbox.get("1.0", "end-1c")) == current
#         except (SyntaxError, NameError):
#             correct = False
#         print(correct)
#         title.config(text=f"{current}")
#         canvas.itemconfig(timer_label, text="Waiting on player...", font=(FONT_NAME, 13, "bold"))
#         event.widget.config(text=f"{rand_card()}" if correct else "")
#     if all(not b.cget("text") for b in buttons):
#         title.config(text="GAME OVER")
#
#
# def rand_card():
#     oper = random.choice(opers[diff])
#     return f"{oper}{random.randint(*nums[diff][opers[diff].index(oper)])} ({random.randint(*times[diff])})"

from tkinter import *
import math
import winsound
import threading
import datetime

# ------------------------------ CONSTANTS ------------------------------ #
PINK = "#e2979c"
RED = "#e7305b"
GREEN = "#9bdeac"
YELLOW = "#f7f5dd"
FONT_NAME = "Courier"
WORK_MIN = 25
SHORT_BREAK_MIN = 5
LONG_BREAK_MIN = 20
reps = 0
paused = False


# ------------------------------ TIMER PAUSE ------------------------------ #
def pause():
    global paused
    main_button.config(text='Pause' if paused else 'Play')
    paused = False if paused else True


# ------------------------------ TIMER RESET ------------------------------ #
def reset():
    global reps, timer, paused
    reps = 0
    paused = False
    window.after_cancel(timer)
    title.config(text="Timer", fg=GREEN)
    canvas.itemconfig(timer_label, text="00:00")
    checkmarks_count.config(text="")
    main_button.config(text='Start', command=start)


# ------------------------------ TIMER MECHANISM ------------------------------ #
def start():
    global reps
    main_button.config(text='Pause', command=pause)
    reps += 1
    if reps % 2 != 0 or reps < 1:
        countdown(WORK_MIN * 60)
        title.config(text="Work!", fg=GREEN)
    elif reps % 2 == 0 and reps % 8 != 0:
        countdown(SHORT_BREAK_MIN * 60)
        title.config(text="Rest.", fg=PINK)
    else:
        title.config(text="Sleep...", fg=RED)
        countdown(LONG_BREAK_MIN * 60)


# ------------------------------ COUNTDOWN MECHANISM ------------------------------ #
def countdown(count):
    global reps, timer
    try:
        if increment.get('1.0', 'end-1c'): count += eval(increment.get('1.0', 'end-1c'))
        increment.delete('1.0', 'end')
    except Exception as e:
        print(f'{e} is not a valid count!')
    while paused:
        window.update()
        if main_button['text'] == 'Start':
            return
    secs, mins = int(count % 60), math.floor(count / 60)
    if count % 60 < 10:
        secs = f"0{secs}"
    if mins < 10:
        mins = f"0{mins}"
    time = f"{mins}:{secs}"
    canvas.itemconfig(timer_label, text=time)
    print(datetime.datetime.now(), time)
    if count == 20:
        threading.Thread(target=lambda: winsound.PlaySound('timer_done.wav', winsound.SND_FILENAME)).start()
    if count > 0:
        timer = window.after(1000, countdown, count - 1)
    else:
        checkmarks_count.config(text="✔" * int(reps / 2 + .5))
        start()


# ------------------------------ UI SETUP ------------------------------ #
window = Tk()
window.title("Pomodoro")
window.protocol("WM_DELETE_WINDOW", lambda: exit(59))
window.config(padx=100, pady=50, bg=YELLOW)

title = Label(text="Timer", bg=YELLOW, fg=GREEN, font=(FONT_NAME, 50))
title.grid(row=0, column=1)

canvas = Canvas(width=200, height=224, bg=YELLOW, highlightthickness=0)
tomato = PhotoImage(file="tomato.png")
canvas.create_image(100, 112, image=tomato)
timer = window.after(0, reset)
timer_label = canvas.create_text(100, 130, text="00:00", fill="white", font=(FONT_NAME, 35, "bold"))
canvas.grid(row=1, column=1)

main_button = Button(text="Start", command=start, highlightthickness=0, bg=YELLOW)
main_button.grid(row=2, column=1)
Button(text="Reset", command=reset, highlightthickness=0, bg=YELLOW).grid(row=3, column=1)

increment = Text(window, height=1, width=5)
increment.grid(row=4, column=1)

checkmarks_count = Label(bg=YELLOW, fg=GREEN)
checkmarks_count.grid(row=5, column=1)

window.mainloop()
