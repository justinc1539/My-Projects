class Button:
    def __init__(self):
        self.self = Button(text="Start", command=start, highlightthickness=5, bg=YELLOW).grid(row=2, column=0)