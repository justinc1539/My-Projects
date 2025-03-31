# Have a look at the youtube video by Christian Thompson
# Written in IDLE

import turtle
import time
import numpy as np
import random

delay = 0.2

win = turtle.Screen()
win.title('Tetris using Python 3 and Turtle')
win.bgcolor('black')
win.setup(600, 800)
win.tracer(0)
win.listen()

score_count = 0
score = turtle.Turtle()
score.color('red')
score.up()
score.hideturtle()
score.goto(60, -300)
score.write('Score: 0', align='center', font=('Courier', 24, 'normal'))


class Shape():
    def __init__(self, grid):
        self.x = 5
        self.y = 0
        self.color = random.randint(1, 6)
        self.grid = grid

        # O block
        self.o = [[1, 1],  # Square/O shape
                  [1, 1]]

        # I block
        self.i1 = [[1, 1, 1, 1]]

        self.i2 = [[1],
                   [1],
                   [1],
                   [1]]

        # L block
        self.l1 = [[0, 0, 1],
                   [1, 1, 1]]

        self.l2 = [[1, 0],
                   [1, 0],
                   [1, 1]]

        self.l3 = [[1, 1, 1],
                   [1, 0, 0]]

        self.l4 = [[1, 1],
                   [0, 1],
                   [0, 1]]

        # J block
        self.j1 = [[1, 0, 0],
                   [1, 1, 1]]

        self.j2 = [[1, 1],
                   [1, 0],
                   [1, 0]]

        self.j3 = [[1, 1, 1],
                   [0, 0, 1]]

        self.j4 = [[0, 1],
                   [0, 1],
                   [1, 1]]

        # Z block
        self.z1 = [[1, 1, 0],
                   [0, 1, 1]]

        self.z2 = [[0, 1],
                   [1, 1],
                   [1, 0]]

        self.z3 = [[1, 1, 0],
                   [0, 1, 1]]

        self.z4 = [[0, 1],
                   [1, 1],
                   [1, 0]]

        # S block
        self.s1 = [[0, 1, 1],
                   [1, 1, 0]]

        self.s2 = [[1, 0],
                   [1, 1],
                   [0, 1]]

        self.s3 = [[0, 1, 1],
                   [1, 1, 0]]

        self.s4 = [[1, 0],
                   [1, 1],
                   [0, 1]]

        # T block
        self.t1 = [[0, 1, 0],
                   [1, 1, 1]]

        self.t2 = [[1, 0],
                   [1, 1],
                   [1, 0]]

        self.t3 = [[1, 1, 1],
                   [0, 1, 0]]

        self.t4 = [[0, 1],
                   [1, 1],
                   [0, 1]]

        shapes = [self.o, self.i1, self.l1, self.s1, self.z1, self.t1, self.j1]

        self.shape = random.choice(shapes)
        if self.shape == self.o:
            self.color = 1
        elif self.shape == self.i1:
            self.color = 2
        elif self.shape == self.l1:
            self.color = 3
        elif self.shape == self.s1:
            self.color = 4
        elif self.shape == self.z1:
            self.color = 5
        elif self.shape == self.t1:
            self.color = 6
        elif self.shape == self.j1:
            self.color = 7

        self.height = len(self.shape)
        self.width = len(self.shape[0])

    def move_right(self):
        if self.x < 12 - self.width:
            if grid[self.y][self.x + self.width] == 0:
                self.erase_shape(grid)
                self.x += 1

    def move_left(self):
        if self.x > 0:
            if grid[self.y][self.x - 1] == 0:
                self.erase_shape(grid)
                self.x -= 1

    def draw_shape(self, grid):
        for y in range(self.height):
            for x in range(self.width):
                if self.shape[y][x] == 1:
                    grid[self.y + y][self.x + x] = self.color

    def erase_shape(self, grid):
        for y in range(self.height):
            for x in range(self.width):
                if self.shape[y][x] == 1:
                    grid[self.y + y][self.x + x] = 0

    def can_move(self, grid):
        for x in range(self.width):
            # check if bottom is a 1
            if self.shape[self.height - 1][x] == 1:  # if bottom of shape is 1
                if grid[self.y + self.height][self.x + x] != 0:  # empty below
                    return False
        return True

    def rotate_shape(self):
        # I Shape
        if self.shape == self.i1:
            self.erase_shape(grid)
            self.shape = self.i2
            self.height = len(self.shape)
            self.width = len(self.shape[0])

        elif self.shape == self.i2:
            self.erase_shape(grid)
            self.shape = self.i1
            self.height = len(self.shape)
            self.width = len(self.shape[0])

        # L shape
        if self.shape == self.l1:
            self.erase_shape(grid)
            self.shape = self.l2
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.l2:
            self.erase_shape(grid)
            self.shape = self.l3
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.l3:
            self.erase_shape(grid)
            self.shape = self.l4
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.l4:
            self.erase_shape(grid)
            self.shape = self.l1
            self.height = len(self.shape)
            self.width = len(self.shape[0])

        # J shape
        if self.shape == self.j1:
            self.erase_shape(grid)
            self.shape = self.j2
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.j2:
            self.erase_shape(grid)
            self.shape = self.j3
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.j3:
            self.erase_shape(grid)
            self.shape = self.j4
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.j4:
            self.erase_shape(grid)
            self.shape = self.j1
            self.height = len(self.shape)
            self.width = len(self.shape[0])

        # Z shape
        if self.shape == self.z1:
            self.erase_shape(grid)
            self.shape = self.z2
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.z2:
            self.erase_shape(grid)
            self.shape = self.z3
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.z3:
            self.erase_shape(grid)
            self.shape = self.z4
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.z4:
            self.erase_shape(grid)
            self.shape = self.z1
            self.height = len(self.shape)
            self.width = len(self.shape[0])

        # S shape
        if self.shape == self.s1:
            self.erase_shape(grid)
            self.shape = self.s2
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.s2:
            self.erase_shape(grid)
            self.shape = self.s3
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.s3:
            self.erase_shape(grid)
            self.shape = self.s4
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.s4:
            self.erase_shape(grid)
            self.shape = self.s1
            self.height = len(self.shape)
            self.width = len(self.shape[0])

        # t shape
        if self.shape == self.t1:
            self.erase_shape(grid)
            self.shape = self.t2
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.t2:
            self.erase_shape(grid)
            self.shape = self.t3
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.t3:
            self.erase_shape(grid)
            self.shape = self.t4
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.t4:
            self.erase_shape(grid)
            self.shape = self.t1
            self.height = len(self.shape)
            self.width = len(self.shape[0])


grid = np.zeros((24, 12))

# Draw outline
border = turtle.Turtle()
border.pensize(10)
border.up()
border.hideturtle()
border.goto(-130, 240)
border.down()
border.color('white')
border.rt(90)
border.fd(490)  # Down
border.lt(90)
border.fd(260)  # Right
border.lt(90)
border.fd(490)  # Up
border.up()
border.goto(0, 260)
border.write("TETRIS", align='center', font=('Courier', 36, 'normal'))

pen = turtle.Turtle()
pen.up()
pen.speed(0)
pen.shape('square')
pen.shapesize(0.9, 0.9)


# pen.setundobuffer(None)


def draw_grid(pen, grid):
    pen.clear()
    top = 230  # start y
    left = -110  # start x

    colors = ['black', 'yellow', 'lightblue', 'orange', 'red', 'green', 'purple',
              'pink']

    for y in range(len(grid)):  # 24 rows (contains 24 lists of 12 elements)
        for x in range(len(grid[0])):  # 12 columns
            screen_x = left + (x * 20)  # each turtle 20x20 pixels
            screen_y = top - (y * 20)
            color_number = int(grid[y][x])  # int 0 to change float in numpy 0.0
            color = colors[color_number]
            pen.color(color)
            pen.goto(screen_x, screen_y)
            pen.stamp()


def check_grid():  # Check for full row
    global score_count

    for y in range(0, 24):
        is_full = True
        y_erase = y
        for x in range(0, 12):
            if grid[y][x] == 0:
                is_full = False
                break
        # Remove row and shift down
        if is_full:
            score_count += 1
            score.clear()
            score.write(f'Score: {score_count}', align='center', font=('Courier', 24, 'normal'))

            for y in range(y_erase - 1, -1, -1):
                for x in range(0, 12):
                    grid[y + 1][x] = grid[y][x]


# Put shape in the grid   
shape = Shape(grid)
grid[shape.y][shape.x] = shape.color

while True:
    win.update()

    # Stop if at the bottom
    if shape.y == 23 - shape.height + 1:
        # shape.move = 'stop'
        check_grid()
        shape = Shape(grid)

    # Drop down one space if empty below/collision
    elif shape.can_move(grid):
        shape.erase_shape(grid)
        shape.y += 1
        shape.draw_shape(grid)

    # Stop if above another block
    else:
        shape = Shape(grid)
        check_grid()

    win.onkey(shape.move_right, 'Right')
    win.onkey(shape.move_left, 'Left')
    win.onkey(shape.rotate_shape, 'space')

    draw_grid(pen, grid)
    time.sleep(delay)
