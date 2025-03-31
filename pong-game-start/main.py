from turtle import Screen
from paddle import Paddle
from ball import Ball
from scoreboard import Scoreboard
import time

screen = Screen()
screen.bgcolor("black")
screen.setup(width=800, height=600)
screen.title("Pong")
screen.tracer(0)

r_paddle = Paddle((350, 0))
l_paddle = Paddle((-350, 0))
ball = Ball()
scoreboard = Scoreboard()


def key_release(func, *keys):
    """Added"""
    for key in keys:
        screen.onkeyrelease(func, key)


screen.listen()
screen.onkeypress(r_paddle.go_up, "Up")
screen.onkeypress(r_paddle.go_down, "Down")
key_release(r_paddle.reset_direc, "Up", "Down")  # Added
screen.onkeypress(l_paddle.go_up, "w")
screen.onkeypress(l_paddle.go_down, "s")
key_release(l_paddle.reset_direc, "w", "s")  # Added

game_is_on = True
while game_is_on:
    for var in {key: value for (key, value) in globals().items()}:
        if var[2:] == "paddle":
            var = globals()[var]
            var.goto(var.xcor(), var.ycor() + var.direction)
            if var.ycor() < -220 or var.ycor() > 240:
                var.goto(var.xcor(), var.ycor() - var.direction)
    time.sleep(ball.move_speed)
    screen.update()
    ball.move()

    # Detect collision with wall
    if ball.ycor() > 280 or ball.ycor() < -280:
        ball.bounce_y()

    # Detect collision with paddle
    if ball.distance(r_paddle) < 50 and ball.xcor() > 320 or ball.distance(l_paddle) < 50 and ball.xcor() < -320:
        ball.bounce_x()

    # Detect R paddle misses
    if ball.xcor() > 380:
        ball.reset_position()
        scoreboard.l_point()

    # Detect L paddle misses:
    if ball.xcor() < -380:
        ball.reset_position()
        scoreboard.r_point()

screen.exitonclick()
