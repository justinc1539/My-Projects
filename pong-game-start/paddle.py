from turtle import Turtle


class Paddle(Turtle):
    
    def __init__(self, position):
        super().__init__()
        self.shape("square")
        self.color("white")
        self.shapesize(stretch_wid=5, stretch_len=1)
        self.penup()
        self.goto(position)
        self.direction = 0  # Added

    def go_up(self):
        self.direction = 20  # Added
        # new_y = self.ycor() + 20
        # self.goto(self.xcor(), new_y)

    def go_down(self):
        self.direction = -20  # Added
        # new_y = self.ycor() - 20
        # self.goto(self.xcor(), new_y)

    def reset_direc(self): self.direction = 0  # Added
