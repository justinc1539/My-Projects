from tkinter import *


def convert():
    kilometers.config(text=eval(miles.get()) * 1.60934)


window = Tk()
window.title("M --> Km Converter")
window.config(padx=20, pady=20)

miles = Entry(width=10)
miles.grid(column=1, row=0)
Label(text="Miles").grid(column=2, row=0)

Label(text="is equal to").grid(column=0, row=1)
kilometers = Label(text=0)
kilometers.grid(column=1, row=1)
Label(text="Km").grid(column=2, row=1)

Button(text="Calculate", command=convert).grid(column=1, row=2)

window.mainloop()
