import random
import turtle as t

tim = t.Turtle()


def reset():
    tim.pu()
    tim.goto(0, 0)
    tim.pd()


# ######## Challenge 1 - Draw a Square ######## #
for _ in range(4):
    tim.forward(100)
    tim.left(90)
reset()

# ######## Challenge 2 - Draw a Dashed Line ######## #
for _ in range(15):
    tim.forward(10)
    tim.penup()
    tim.forward(10)
    tim.pendown()
reset()

# ######## Challenge 3 - Draw Shapes ######## #
colours = ["CornflowerBlue", "DarkOrchid", "IndianRed", "DeepSkyBlue", "LightSeaGreen", "wheat", "SlateGray",
           "SeaGreen"]


def draw_shape(num_sides):
    angle = 360 / num_sides
    for _ in range(num_sides):
        tim.forward(100)
        tim.right(angle)


for shape_side_n in range(3, 10):
    tim.color(random.choice(colours))
    draw_shape(shape_side_n)
reset()

# ######## Challenge 4 - Random Walk ######## #
colours = ["CornflowerBlue", "DarkOrchid", "IndianRed", "DeepSkyBlue", "LightSeaGreen", "wheat", "SlateGray",
           "SeaGreen"]
directions = [0, 90, 180, 270]
tim.pensize(15)
tim.speed(0)

for _ in range(200):
    tim.color(random.choice(colours))
    tim.forward(30)
    tim.setheading(random.choice(directions))
reset()

# ######## Challenge 5 - Spirograph ######## #
t.speed(6)

t.colormode(255)


def draw_spirograph(size_of_gap):
    for _ in range(int(360 / size_of_gap)):
        tim.color(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
        tim.circle(100)
        tim.setheading(tim.heading() + size_of_gap)


draw_spirograph(5)
