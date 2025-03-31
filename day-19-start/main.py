# Etch-A-Sketch App
# import turtle
# from turtle import Turtle, Screen
#
# tim = Turtle()
# screen = Screen()
#
#
# def move_forwards():
#     tim.forward(10)
#
#
# def move_backwards():
#     tim.backward(10)
#
#
# def turn_left():
#     tim.setheading(tim.heading() + 10)
#
# def turn_right():
#     tim.setheading(tim.heading() - 10)
#
#
# def clear():
#     tim.speed("fastest")
#     tim.home()
#     tim.clear()
#     tim.speed("normal")
#
#
# screen.listen()
# screen.onkeypress(move_forwards, "Up")
# screen.onkeypress(move_backwards, "Down")
# screen.onkeypress(turn_left, "Left")
# screen.onkeypress(turn_right, "Right")
# screen.onkeypress(clear, "c")
# screen.exitonclick()

# Turtle Racing
# from turtle import Turtle, Screen
# import random
#
# is_race_on = False
# screen = Screen()
# screen.setup(500, 400)
# user_bet = screen.textinput("Make your bet", "Which turtle will win the race? Enter a color: ")
# colors = ["red", "orange", "yellow", "green", "blue", "purple"]
# y_positions = [-70, -40, -10, 20, 50, 80]
# all_turtles = []
#
# for turtle_index in range(0, 6):
#     new_turtle = Turtle("turtle")
#     new_turtle.penup()
#     new_turtle.color(colors[turtle_index])
#     new_turtle.goto(-230, y_positions[turtle_index])
#     all_turtles.append(new_turtle)
#
# if user_bet:
#     is_race_on = True
#
# while is_race_on:
#     for turtle in all_turtles:
#         if turtle.xcor() > 230:
#             is_race_on = False
#             if turtle.pencolor() == user_bet:
#                 print(f"You've won! The {turtle.pencolor()} turtle is the winner!")
#
#             else:
#                 print(f"You've lost! The {turtle.pencolor()} turtle is the winner!")
#         turtle.forward(random.randint(0, 10))
# screen.exitonclick()

# Etch-A-Sketch App
from turtle import Turtle, Screen

tim = Turtle()
screen = Screen()
charge_power, move, charge, charging = 0, 0, [0, 0, 0], False


def move_forwards(): globals()["move"] = 10


def move_backwards(): globals()["move"] = -10


def turn_left(): print(charging, charge[0]); globals()["charge_power"] = (charge_power + 0.25 if charge_power < 5 else 0) if not charging and charge[0] > 0 else 3


def turn_right(): print(charging, charge[0]); globals()["charge_power"] = (charge_power - 0.25 if charge_power > -5 else 0) if not charging and charge[0] > 0 else -3


def clear(): tim.speed("fastest"); tim.home(); tim.clear(); tim.speed("normal")


def stop_move(): globals()["move"] = 0


def stop_turn(): globals()["charge_power"] = (charge_power - 0.25 if charge_power < 0 else -0.25 if charge_power > 0 else 0) if not charging and charge[0] > 0 else 0


screen.listen()


def key_press(func, *keys):
    for key in keys:
        screen.onkeypress(func, key)


def key_release(func, *keys):
    for key in keys:
        screen.onkeyrelease(func, key)


def charge_it():
    globals()["charging"] = True


def send_it():
    globals()["charging"] = False


key_press(charge_it, "Up", "w")
key_release(send_it, "Up", "w")
key_press(move_backwards, "Down", "s")
key_release(stop_move, "Down", "s")
key_press(turn_left, "Left", "a")
key_release(stop_turn, "Left", "a")
key_press(turn_right, "Right", "d")
key_release(stop_turn, "Right", "d")
key_press(clear, "c")
key_press(lambda: screen.bye(), "q")
tim.speed(0)
while 1:
    tim.setheading(tim.heading() + charge_power)

    print("Da stats:", charge)
    if charging:
        charge[1] += 1 if charge[1] < 55 else 0
        charge[0] = 1.07 ** (charge[1] - 20) if charge[0] else 1
    else:

        if charge[2] > 0:
            charge[1] -= 1 if charge[1] > 0 else 0
            tim.forward(charge[0])
            charge[0] -= 0.2
