from tkinter import *
import requests


def get_quote():
    canvas.itemconfig(2, text=requests.get("https://api.kanye.rest").json()["quote"])


window = Tk()
window.title("Kanye Says...")
window.config(padx=50, pady=50)

canvas = Canvas(width=300, height=414)
background_img = PhotoImage(file="background.png")
canvas.create_image(150, 207, image=background_img)
canvas.create_text(150, 207, text="Kanye Quote Goes HERE", width=250, font=("Arial", 30, "bold"), fill="white")
canvas.grid()

kanye_img = PhotoImage(file="kanye.png")
Button(image=kanye_img, highlightthickness=0, command=get_quote).grid(row=1)

window.mainloop()
