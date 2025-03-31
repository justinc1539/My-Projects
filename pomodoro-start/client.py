from mathyo import *
from network import Network


window = Tk()
window.title("Math, yo!")
window.config(padx=100, pady=50, bg=YELLOW)

title = Label(text=f"{current}", bg=YELLOW, fg=GREEN, font=(FONT_NAME, 50))
title.grid(row=0, column=1)

canvas = Canvas(width=200, height=224, bg=YELLOW, highlightthickness=0)
# tomato = PhotoImage(file="tomato.png")
# canvas.create_image(100, 112, image=tomato)
timer_label = canvas.create_text(100, 130, text=f"Waiting on player...", fill="black", font=(FONT_NAME, 13, "bold"))
canvas.grid(row=1, column=1)

textbox = Text(window, height=1, width=10)
textbox.grid(row=2, column=1)
buttons = []
current_card = None
for i in range(cards[diff]):
    buttons.append(Button(highlightthickness=0, bg=YELLOW))
    buttons[i].grid(row=3, column=i)
    buttons[i].bind("<Button-1>", start)
Button(text="Skip Timer", command=lambda: check(), highlightthickness=0).grid(row=4, column=1)

# n = Network()
# start = n.get_start()
#
# n.send(f"cards{cards[diff]}")
for b in buttons:
    b.config(text=f"cards{cards[diff]}")

# print(start)
print('ok!')
window.mainloop()
