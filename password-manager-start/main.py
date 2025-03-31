from tkinter import *
from tkinter import messagebox
from random import choice, randint, sample
import pyperclip
import json


# ---------------------------- PASSWORD GENERATOR ------------------------------- #
def generate():
    password.delete(0, END)
    password_list = [choice(
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
         'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
         'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']) for _ in range(randint(8, 10))] + [
                        choice(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) for _ in range(randint(2, 4))] + [
                        choice(['!', '#', '$', '%', '&', '(', ')', '*', '+']) for _ in range(randint(2, 4))]
    generated_password = "".join(sample(password_list, len(password_list)))
    password.insert(0, generated_password)
    pyperclip.copy(generated_password)


# ------------------------------ SAVE PASSWORD ------------------------------ #
def save():
    if website.get() and email.get() and password.get():
        # answer = messagebox.askokcancel(title=f"Save to {website.get()}",
        #                                 message=f"These are the details entered:\nEmail: {username.get()}"
        #                                         f"\nPassword: {password.get()}\nSave?")
        # if answer:
        try:
            with open("data.json", "r") as file:
                data = json.load(file)
        except FileNotFoundError:
            with open("data.json", "w") as file:
                json.dump({website.get(): {"email": email.get(), "password": password.get()}}, file, indent=4)
        else:
            data.update({website.get(): {"email": email.get(), "password": password.get()}})
            with open("data.json", "w") as old_file:
                json.dump(data, old_file, indent=4)
        finally:
            website.delete(0, END)
            password.delete(0, END)
    else:
        messagebox.showerror(title="You suck!", message="I hate you. Please go die.")


# ------------------------------ FIND PASSWORD ------------------------------ #
def find_password():
    try:
        with open("data.json", "r") as file:
            data = json.load(file)
            messagebox.showinfo(title=website.get(), message=f"Email: {data[str(website.get())]['email']}\n"
                                                             f"Password: {data[str(website.get())]['password']}")
    except json.decoder.JSONDecodeError:
        messagebox.showerror(title="Error", message=f"No details for {website.get()} exists.")


# ------------------------------ UI SETUP ------------------------------ #
window = Tk()
window.title("Password Manager")
window.config(padx=50, pady=50)

canvas = Canvas(width=200, height=200)
logo = PhotoImage(file="logo.png")
canvas.create_image(100, 100, image=logo)
canvas.grid(column=1)

Label(text="Website:").grid(row=1)
website = Entry(width=21)
website.focus()
website.grid(row=1, column=1)
Button(text="Search", command=find_password, width=14).grid(row=1, column=2)

Label(text="Email/Username:").grid(row=2)
email = Entry(width=35)
email.insert(0, "justinc1539@gmail.com")
email.grid(row=2, column=1, columnspan=2)

Label(text="Password:").grid(row=3)
password = Entry(width=21)
password.grid(row=3, column=1)
Button(text="Generate Password", command=generate, width=14).grid(row=3, column=2)

Button(text="Add", command=save, width=36).grid(row=4, column=1, columnspan=2)

window.mainloop()
