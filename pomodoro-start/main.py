from tkinter import *
import math
import winsound
from threading import Thread
import datetime
import random, time, os


def check_user_input():
    """Checks for user input (example: checking a variable)."""
    global user_input  # Access the global variable
    if user_input == "p":  # in ["play", "pause"]:
        print("Playing" if paused else "Pausing")
        pause()
    elif user_input != "":
        print(f"Unknown input: {user_input} (Type \"p\" to play/pause)")
    user_input = ""

    window.after(100, check_user_input)  # Schedule the function to run again after 100ms

def on_key_press(event):
    global user_input
    user_input += event.char
    print(f"Current input: {user_input}")


user_input = ""
long_task_running = False


def encouragement(delay=0):
    """Make sure this runs as a daemon Thread!"""
    files = []
    while True:
        # print(files)
        if len(files) <= 0:
            files = [f for f in os.listdir('encouragement') if f.endswith('.wav')]
        for i in range(delay if delay else random.randint(1, 20) * 60, -1, -1):
            # print(i)
            time.sleep(1)
        filename = random.choice(files)
        files.remove(filename)
        print(f'Playing {filename}...')
        winsound.PlaySound(f'encouragement/{filename}', winsound.SND_FILENAME)


# Thread(target=lambda: encouragement(), daemon=True).start()

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
    window.attributes('-topmost', 1 if paused else 0)
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
    increment.delete('1.0', 'end')


# ------------------------------ TIMER MECHANISM ------------------------------ #
def start():
    global reps
    window.attributes('-topmost', 1)
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
        Thread(target=lambda: winsound.PlaySound('timer_done.wav', winsound.SND_FILENAME), daemon=True).start()
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

# Thread(target=lambda: window.mainloop(), daemon=True).start()
# while True:
#     if input().lower() in ["play", "pause"]:
#         pause()
#     else:
#         print("Invalid choice! Type \"Play\" to play or \"Pause\" to pause.")

window.bind("<Key>", on_key_press) # Bind key presses to the input handler

window.after(100, check_user_input)  # Start the input check loop

window.mainloop()