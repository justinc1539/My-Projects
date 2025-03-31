import pandas
import turtle

turtle.Screen().title("U.S. States Game")
turtle.Screen().addshape("blank_states_img.gif")
turtle.shape("blank_states_img.gif")
tim = turtle.Turtle()
tim.ht()
tim.pu()

data = pandas.read_csv("50_states.csv")
states = []
answer_state = turtle.Screen().textinput("Guess the State", "What's a the name of a state?").title()

while not len(states) > 50:
    if answer_state == "Exit":
        missing_states = []
        for state in data.state:
            if state not in states:
                missing_states.append(state)

        pandas.DataFrame({"state": missing_states}).to_csv("states_to_learn.csv")
        break
    for state in data.state:
        if state == answer_state and state not in states:
            tim.goto(int(data.iloc[0].x), int(data.iloc[0].y))
            tim.write(state)
            states.append(state)
    answer_state = turtle.Screen().textinput(f"{len(states)}/50 States Correct", "What's another state name?").title()
