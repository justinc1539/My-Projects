from tkinter import *
from quiz_brain import QuizBrain

THEME_COLOR = "#375362"


class QuizInterface:
    def __init__(self, brain: QuizBrain):
        self.quiz = brain
        self.score = 0

        self.window = Tk()
        self.window.title("Quizzler")
        self.window.config(padx=20, pady=20, bg=THEME_COLOR)

        self.score_label = Label(fg="white", bg=THEME_COLOR)
        self.score_label.grid(column=1)

        self.canvas = Canvas(width=300, height=250, bg="white")
        self.canvas.create_text(150, 125, width=280, fill=THEME_COLOR, font=("Arial", 20, "italic"))
        self.canvas.grid(row=1, columnspan=2, pady=50)

        true_image = PhotoImage(file="images/true.png")
        self.true = Button(image=true_image, highlightthickness=0, command=self.selected_true)
        self.true.grid(row=2)
        false_image = PhotoImage(file="images/false.png")
        self.false = Button(image=false_image, highlightthickness=0, command=self.selected_false)
        self.false.grid(row=2, column=1)

        self.next_question()

        self.window.mainloop()

    def next_question(self):
        if self.quiz.still_has_questions():
            self.canvas.itemconfig(1, text=self.quiz.next_question())
            self.score_label.config(text=f"Score: {self.score}")
        else:
            self.canvas.itemconfig(1, text="You've reached the end of the quiz.")
            self.true.config(state="disabled")
            self.false.config(state="disabled")

    def selected_true(self):
        self.feedback(self.quiz.check_answer("True"))

    def selected_false(self):
        self.feedback(self.quiz.check_answer("False"))

    def feedback(self, is_right):
        if is_right:
            self.canvas.config(bg="green")
            self.score += 1
        else:
            self.canvas.config(bg="red")
        self.window.after(1000, lambda: (self.canvas.config(bg="white"), self.next_question()))
