from tkinter import *
import pandas
import random

timers = ['after']

try:
    to_learn = pandas.read_csv("data/words_to_learn.csv").to_dict(orient="records")
except FileNotFoundError:
    to_learn = pandas.read_csv("data/french_words.csv").to_dict(orient="records")
except pandas.errors.EmptyDataError:
    to_learn = pandas.read_csv("data/french_words.csv").to_dict(orient="records")


def next_card():
    global current_card
    for timer in timers:
        window.after_cancel(timer)
        timers.remove(timer)
    try:
        current_card = random.choice(to_learn)
    except IndexError:
        window.destroy()
    else:
        canvas.itemconfig(2, text="French", fill="black")
        canvas.itemconfig(3, text=current_card["French"], fill="black")
        canvas.itemconfig(1, image=front)
        flip_timer = window.after(3000, lambda: (
            canvas.itemconfig(2, text="English"), canvas.itemconfig(3, text=current_card['English'], fill="white"),
            canvas.itemconfig(1, image=back)))
        timers.append(flip_timer)


def is_known():
    to_learn.remove(current_card)
    pandas.DataFrame(to_learn).to_csv("data/words_to_learn.csv", index=False)
    next_card()


window = Tk()
window.title("Flashy")
window.config(padx=50, pady=50, bg="#B1DDC6")

canvas = Canvas(width=800, height=526, bg="#B1DDC6", highlightthickness=0)
front = PhotoImage(file="images/card_front.png")
back = PhotoImage(file="images/card_back.png")
canvas.create_image(400, 263, image=front)
canvas.create_text(400, 150, font=("Ariel", 40, "italic"))
canvas.create_text(400, 263, font=("Ariel", 60, "bold"))
canvas.grid(row=0, column=0, columnspan=2)

cross = PhotoImage(file="images/wrong.png")
Button(image=cross, highlightthickness=0, bd=0, command=next_card).grid(row=1, column=0)

check = PhotoImage(file="images/right.png")
Button(image=check, highlightthickness=0, bd=0, command=is_known).grid(row=1, column=1)

next_card()

window.mainloop()
