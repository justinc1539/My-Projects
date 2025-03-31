from tkinter import *


def button_clicked():
    print("I got clicked")
    new_text = input.get()
    my_label.config(text=new_text)
    # my_label["text"] = new_text


window = Tk()  # .pack()
window.title("My First GUI Program")
window.minsize(width=500, height=300)
window.config(padx=100, pady=200)
# window["padx"] = 100
# window["pady"] = 200

# Label
my_label = Label(text="I Am a Label", font=("Arial", 24, "bold"))  # .pack()
my_label.config(text="New Text", padx=50, pady=50)
# my_label["text"] = "New Text"
# my_label["padx"] = 50
# my_label["pady"] = 50
my_label.grid(column=0, row=0)

# Button
Button(text="Click Me", command=button_clicked).grid(column=1, row=1)

Button(text="New Button").grid(column=2, row=0)

# Entry
input = Entry(width=10)
input.grid(column=3, row=2)

window.mainloop()

