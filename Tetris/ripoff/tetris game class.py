# Simple Tetris with python 3 and Turtle
# Relied quite a lot on the youtube tutorial by Christian Thompson
# Game still in progress
# collision check is not yet 100% and there is still some issues but working!!

import turtle
import time
import numpy as np
import random


def new_grid():
    grid = np.zeros((24, 12))


class Score(turtle.Turtle):
    def __init__(self):
        super().__init__(shape='square')
        self.score_count = 0
        self.color('red')
        self.up()
        self.hideturtle()
        self.goto(60, -300)
        self.write('Score: 0', align='center', font=('Courier', 24, 'normal'))


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

        # self.z3 = [[1,1,0],
        # [0,1,1]]

        # self.z4 = [[0,1],
        # [1,1],
        # [1,0]]

        # S block
        self.s1 = [[0, 1, 1],
                   [1, 1, 0]]

        self.s2 = [[1, 0],
                   [1, 1],
                   [0, 1]]

        # self.s3 = [[0,1,1],
        # [1,1,0]]

        # self.s4 = [[1,0],
        # [1,1],
        # [0,1]]

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

        # Give colors
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
            if self.grid[self.y][self.x + self.width] == 0:
                self.erase_shape(self.grid)
                self.x += 1

    def move_left(self):
        if self.x > 0:
            if self.grid[self.y][self.x - 1] == 0:
                self.erase_shape(self.grid)
                self.x -= 1

    def draw_shape(self, grid):
        for y in range(self.height):
            for x in range(self.width):
                if self.shape[y][x] == 1:
                    self.grid[self.y + y][self.x + x] = self.color

    def erase_shape(self, grid):
        for y in range(self.height):
            for x in range(self.width):
                if self.shape[y][x] == 1:
                    self.grid[self.y + y][self.x + x] = 0

    def can_move(self, grid):
        for x in range(self.width):
            # check if bottom is a 1
            if self.shape[self.height - 1][x] == 1:  # if bottom of shape is 1
                if self.grid[self.y + self.height][self.x + x] != 0:  # empty below
                    return False
        return True

    def rotate_shape(self):
        # I Shape
        if self.shape == self.i1:
            self.erase_shape(self.grid)
            self.shape = self.i2
            self.height = len(self.shape)
            self.width = len(self.shape[0])

        elif self.shape == self.i2:
            self.erase_shape(self.grid)
            self.shape = self.i1
            self.height = len(self.shape)
            self.width = len(self.shape[0])

        # L shape
        if self.shape == self.l1:
            self.erase_shape(self.grid)
            self.shape = self.l2
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.l2:
            self.erase_shape(self.grid)
            self.shape = self.l3
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.l3:
            self.erase_shape(self.grid)
            self.shape = self.l4
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.l4:
            self.erase_shape(self.grid)
            self.shape = self.l1
            self.height = len(self.shape)
            self.width = len(self.shape[0])

        # J shape
        if self.shape == self.j1:
            self.erase_shape(self.grid)
            self.shape = self.j2
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.j2:
            self.erase_shape(self.grid)
            self.shape = self.j3
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.j3:
            self.erase_shape(self.grid)
            self.shape = self.j4
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.j4:
            self.erase_shape(self.grid)
            self.shape = self.j1
            self.height = len(self.shape)
            self.width = len(self.shape[0])

        # Z shape
        if self.shape == self.z1:
            self.erase_shape(self.grid)
            self.shape = self.z2
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.z2:
            self.erase_shape(self.grid)
            self.shape = self.z1
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        # elif self.shape == self.z3:
        # self.erase_shape(self.grid)
        # self.shape = self.z4
        # self.height = len(self.shape)
        # self.width = len(self.shape[0])
        # elif self.shape == self.z4:
        # self.erase_shape(self.grid)
        # self.shape = self.z1
        # self.height = len(self.shape)
        # self.width = len(self.shape[0])

        # S shape
        if self.shape == self.s1:
            self.erase_shape(self.grid)
            self.shape = self.s2
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.s2:
            self.erase_shape(self.grid)
            self.shape = self.s1
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        # elif self.shape == self.s3:
        # self.erase_shape(self.grid)
        # self.shape = self.s4
        # self.height = len(self.shape)
        # self.width = len(self.shape[0])
        # elif self.shape == self.s4:
        # self.erase_shape(self.grid)
        # self.shape = self.s1
        # self.height = len(self.shape)
        # self.width = len(self.shape[0])

        # t shape
        if self.shape == self.t1:
            self.erase_shape(self.grid)
            self.shape = self.t2
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.t2:
            self.erase_shape(self.grid)
            self.shape = self.t3
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.t3:
            self.erase_shape(self.grid)
            self.shape = self.t4
            self.height = len(self.shape)
            self.width = len(self.shape[0])
        elif self.shape == self.t4:
            self.erase_shape(self.grid)
            self.shape = self.t1
            self.height = len(self.shape)
            self.width = len(self.shape[0])


class Border(turtle.Turtle):
    def __init__(self):
        super().__init__(shape='square')
        self.pensize(10)
        self.up()
        self.hideturtle()
        self.goto(-130, 240)
        self.down()
        self.color('white')
        self.rt(90)
        self.fd(490)  # Down
        self.lt(90)
        self.fd(260)  # Right
        self.lt(90)
        self.fd(490)  # Up
        self.up()
        self.goto(0, 260)
        self.write("TETRIS", align='center', font=('Courier', 36, 'normal'))


class Pen(turtle.Turtle):
    def __init__(self):
        super().__init__(shape='square')
        self.up()
        self.speed(0)
        self.shapesize(0.9, 0.9)


class Game():
    def __init__(self):
        self.delay = 0.15

        self.win = turtle.Screen()
        self.win.title('Tetris using Python 3 and Turtle')
        self.win.bgcolor('black')
        self.win.setup(600, 800)
        self.win.tracer(0)
        self.win.listen()

    def new_game(self):
        self.grid = np.zeros((24, 12))

        self.border = Border()
        self.pen = Pen()
        self.shape = Shape(self.grid)
        self.score = Score()

        self.run()

    def run(self):
        self.playing = True

        while self.playing:
            self.events()
            self.update()

    def events(self):

        self.win.onkey(self.shape.move_right, 'Right')
        self.win.onkey(self.shape.move_left, 'Left')
        self.win.onkey(self.shape.rotate_shape, 'space')
        self.win.onkey(self.game_over, 'q')

    def update(self):

        self.win.update()

        # Game over at top or 'q' to quit (see keypress)
        if self.shape.y < 2 and self.shape.can_move(self.grid) == False:
            self.playing = False

        # Stop if at the bottom
        if self.shape.y == 23 - self.shape.height + 1:
            # shape.move = 'stop'
            self.check_grid()
            self.shape = Shape(self.grid)

        # Drop down one space if empty below/collision
        elif self.shape.can_move(self.grid):
            self.shape.erase_shape(self.grid)
            self.shape.y += 1
            self.shape.draw_shape(self.grid)

        # Stop if above another block
        else:
            self.shape = Shape(self.grid)
            self.check_grid()

        self.draw_grid()
        time.sleep(self.delay)

    def draw_grid(self):
        self.pen.clear()
        self.top = 230  # start y
        self.left = -110  # start x

        self.colors = ['black', 'yellow', 'lightblue', 'orange', 'red', 'green', 'purple',
                       'pink']

        for y in range(len(self.grid)):  # 24 rows (contains 24 lists of 12 elements)
            for x in range(len(self.grid[0])):  # 12 columns
                screen_x = self.left + (x * 20)  # each turtle 20x20 pixels
                screen_y = self.top - (y * 20)
                color_number = int(self.grid[y][x])  # int 0 to change float in numpy 0.0
                color = self.colors[color_number]
                self.pen.color(color)
                self.pen.goto(screen_x, screen_y)
                self.pen.stamp()

    def check_grid(self):  # Check for full row
        for y in range(0, 24):
            is_full = True
            y_erase = y
            for x in range(0, 12):
                if self.grid[y][x] == 0:
                    is_full = False
                    break
            # Remove row and shift down
            if is_full:
                self.score.score_count += 1
                self.score.clear()
                self.score.write(f'Score: {self.score.score_count}', align='center', font=('Courier', 24, 'normal'))

                for y in range(y_erase - 1, -1, -1):
                    for x in range(0, 12):
                        self.grid[y + 1][x] = self.grid[y][x]

    def show_start_screen(self):
        self.title = Score()
        self.waiting = True
        self.title.goto(0, 0)
        self.win.onkey(self.wait_for_keypress, 'space')

        while self.waiting:
            self.win.bgcolor('black')
            self.title.write('Tetris Game with Python 3 and Turtle\n\n Press the "space" key to continue',
                             align='center', font=('Courier', 24, 'normal'))
        self.title.clear()

    def show_game_over_screen(self):
        self.title1 = Score()
        self.waiting = True
        self.title1.goto(0, 0)
        self.win.onkey(self.wait_for_keypress, 'space')

        while self.waiting:
            self.win.bgcolor('black')
            self.title1.write(f'\t   Game Over \n\n Press the "space" key for new game',
                              align='center', font=('Courier', 24, 'normal'))

        self.title1.clear()

    def wait_for_keypress(self):
        self.waiting = False

    def game_over(self):
        self.playing = False


game = Game()
game.show_start_screen()

while True:
    game.new_game()
    game.show_game_over_screen()
    # new_grid()
