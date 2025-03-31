import random
import os
import time
import tkinter
import threading
import typing

if __name__ == "__main__":
    print("\033[31mRun main.py, not this file.\033[0m")
    exit(1)
new_controls = False
inputs = []
filepath = ""
characters = {}
use_colors = True
clear_screen = True
end_result = None
conversations = None
# TODO (Does this cause an error?): conversations: typing.Optional[typing.List] = None


def new_control(*args, **kwargs):
    """The foundation of revolutionized movement using tkinter to replace using input() to move."""

    def key_press(event):
        """Handles key press events."""
        nonlocal w_label, a_label, s_label, d_label, up_label, left_label, down_label, right_label
        for char in ["w", "a", "s", "d", "q"]:
            if event.char == char:
                if event.char == "q":
                    root.after(0, handle_result, root, None)
                    #TODO (Does this cause an error?):
                    # if result is not None:
                    #     root.after(0, handle_result, root, result)
                else:
                    eval(f"{char}_label").config(bg="black", fg="white")
                inputs.append(event.char)

        for keysym in ["Up", "Left", "Down", "Right"]:
            if event.keysym == keysym:
                eval(f"{keysym.lower()}_label").config(bg="black", fg="white")
                inputs.append(event.keysym.lower())

        # Ok look alright, I understand that holding down two keys still forces the player to only move with one of the
        # inputs, but if I made key press/release events trigger a boolean that then determines whether and where the
        # player moves, it would cause the player to rapidly move if the user holds down the button for a little too
        # long, which I prefer having that short delay of holding before it initiates the rapid movement.

    def key_release(event):
        """Handles key release events."""
        nonlocal w_label, a_label, s_label, d_label, up_label, left_label, down_label, right_label
        for char in ["w", "a", "s", "d", "q"]:
            if event.char == char:
                eval(f"{char}_label").config(bg="white", fg="black")

        for keysym in ["Up", "Left", "Down", "Right"]:
            if event.keysym == keysym:
                eval(f"{keysym.lower()}_label").config(bg="white", fg="black")

    # Create and title movement window
    root = tkinter.Tk()
    root.title("Move Character")

    # Create labels
    w_label = tkinter.Label(root, text="W")
    w_label.grid(row=0, column=1)
    a_label = tkinter.Label(root, text="A")
    a_label.grid(row=1, column=0)
    s_label = tkinter.Label(root, text="S")
    s_label.grid(row=1, column=1)
    d_label = tkinter.Label(root, text="D")
    d_label.grid(row=1, column=2)
    up_label = tkinter.Label(root, text="↑")
    up_label.grid(row=0, column=4)
    left_label = tkinter.Label(root, text="←")
    left_label.grid(row=1, column=3)
    down_label = tkinter.Label(root, text="↓")
    down_label.grid(row=1, column=4)
    right_label = tkinter.Label(root, text="→")
    right_label.grid(row=1, column=5)
    tkinter.Label(root, text="Press 'Q' to quit.").grid(row=2, column=6)

    # Bind key press and release events
    root.bind("<KeyPress>", key_press)
    root.bind("<KeyRelease>", key_release)

    def threaded_task():
        result = game_map(*args, **kwargs)
        root.after(0, handle_result, root, result)

    threading.Thread(target=threaded_task).start()
    root.mainloop()


def handle_result(root, result):
    """Redefines end_result so the main file can process the data game_map returns."""
    global end_result
    end_result = result
    root.destroy()


def round_num(num):
    """Round a number.

    Args:
        num: The number to be rounded.

    Returns:
        The rounded number if it can be rounded, the unchanged number otherwise.
    """
    try:
        return round(num)
    except (TypeError, OverflowError):
        return num

    # round() raises TypeError for complex numbers and OverflowError for infinite values.
    # This function avoids such errors, allowing more options.


def color_text(text, *color):
    """
    Colors text.

    Args:
        text (str): The text to be colored.
        *color (str): Any number of color names. If no color is provided, the text will default color.

    Example:
        color_text("Hello", "red", "bold")  # Returns red and bold "Hello"
        color_text("World")  # Returns normal colored "World"
    """
    colors = {
        "black": "\033[0;30m",
        "red": "\033[0;31m",
        "green": "\033[0;32m",
        "brown": "\033[0;33m",
        "blue": "\033[0;34m",
        "purple": "\033[0;35m",
        "cyan": "\033[0;36m",
        "light_gray": "\033[0;37m",
        "dark_gray": "\033[1;30m",
        "light_red": "\033[1;31m",
        "light_green": "\033[1;32m",
        "yellow": "\033[1;33m",
        "light_blue": "\033[1;34m",
        "light_purple": "\033[1;35m",
        "light_cyan": "\033[1;36m",
        "light_white": "\033[1;37m",
        "bold": "\033[1m",
        "faint": "\033[2m",
        "italic": "\033[3m",
        "underline": "\033[4m",
        "blink": "\033[5m",
        "negative": "\033[7m",
        "crossed": "\033[9m",
        "end": "\033[0m",
    }
    colors["random"] = random.choice(list(colors.values()))

    return (
        f"{"".join([colors[c.lower()] for c in color])}{text}\033[0m"
        if use_colors
        else text
    )


class Superhero:
    def __init__(self, name, health, brains, speed, powers):
        self.name = name
        self.health = health
        self.brains = brains
        self.speed = speed
        self.powers = powers

    def status(self):
        stats = [
            f"Name: {self.name}",
            f"Health: {self.health}",
            f"Brains: {self.brains}",
            f"Speed: {self.speed}",
            "Special Powers",
            "\n".join(
                [
                    f"    {power}: {self.powers[power][0].title()} ({self.powers[power][1]})"
                    for power in self.powers
                ]
            ),
        ]
        print("\n".join(stats))

    def take_turn(self, team, enemy):
        if self.health < 0:
            return print(f"{self.name} has fallen! You can not use their turn.")

        target = 0
        choice = input(
            f"What will {self.name} do? ({", ".join(team[self.name].powers)}, Swap, Skip): "
        ).title()
        if choice == "Swap":
            for ally in team.values():
                ally.status()
            while True:
                choice = input("Who will step up in their place? ").title()
                if choice not in team:
                    print("Invalid choice!")
                elif team[choice].health > 0:
                    team[choice].take_turn(team, enemy)
                    break
                else:
                    print(
                        f"{team[choice].name} has fallen! You can not use their turn."
                    )
        elif choice in team[self.name].powers:
            power = team[self.name].powers[choice]
            print(f"{self.name} uses {choice}!")
            if power[0] == "attack":
                enemy.health -= power[1]
                print(
                    f"{self.name} dealt {power[1]} damage, leaving {enemy.name} at {enemy.health} health."
                )
            elif power[0] == "evade":
                self.speed += power[1]
                print(
                    f"{self.name} boosted their speed by {power[1]}, now making their speed {self.speed}."
                )
            elif power[0] == "heal":
                for ally in team:
                    print(f"{ally}: {team[ally].health}")
                while target not in team:
                    target = input(f"Who do you want to heal? ").title()
                    if target not in team:
                        print("Invalid choice!")
                team[target].health += power[1]
                print(
                    f"{self.name} healed {target if target != self.name else "themselves"} by {power[1]}! They now have {team[target].health} health."
                )
            elif power[0] == "attack buff":
                for action in team[self.name].powers:
                    if team[self.name].powers[action][0] == "attack":
                        team[self.name].powers[action][1] = round_num(
                            team[self.name].powers[action][1] * power[1]
                        )
                print(
                    f"{self.name} buffed all their attacks by {round_num(power[1] * 100) - 100}%! "
                    f"{", ".join([f"{action} now does {team[self.name].powers[action][1]} damage"
                    for action in team[self.name].powers if team[self.name].powers[action][0] == "attack"])}."
                )
            elif power[0] == "attack debuff":
                for action in enemy.attacks:
                    if enemy.attacks[action][0] in ["quick attack", "strong attack"]:
                        enemy.attacks[action][1] = round_num(
                            enemy.attacks[action][1] * power[1]
                        )
                print(
                    f"{self.name} decreased {enemy.name}'s attacks by {100 - power[1] * 100}%! "
                    f"Now they only do {power[1] * 100}% of their damage."
                )
        elif choice in ["Skip", "S"]:
            pass
        else:
            print("Invalid choice!")
            self.take_turn(team, enemy)


class Enemy:
    def __init__(self, name, health, attacks, team):
        self.name = name
        self.health = health
        self.attacks = attacks
        self.team = team

    def reset(self, name, health, attacks, team):
        self.name = name
        self.health = health
        self.attacks = attacks
        self.team = team

    def encounter(self, level: int):
        stats = {
            "name": self.name,
            "health": self.health,
            "attacks": self.attacks,
            "team": self.team,
        }
        """Sets a temporary dictionary of all the values to be reset when the battle ends."""
        self.team = {key: Superhero(*self.team[key]) for key in self.team}
        for ally in self.team.values():
            ally.health = round_num(ally.health * (1 + 0.2 * level))
            ally.brains = round_num(ally.brains * (1 + 0.5 * level))
            ally.speed = round_num(ally.speed * (1 + 0.4 * level))
        print(
            random.choice(
                [
                    f"{self.name} attacks!",
                    f"You encounter {self.name}!",
                    f"{self.name} approaches!",
                ]
            )
        )

        # Loop battle
        while self.health > 0 and any(ally.health > 0 for ally in self.team.values()):
            for ally in self.team.values():
                if self.health > 0:
                    ally.take_turn(self.team, self)
            if self.health > 0 and any(ally.health > 0 for ally in self.team.values()):
                while True:
                    target = random.choice(list(self.team.keys()))
                    if self.team[target].health > 0:
                        self.take_turn(self.attacks, self.team[target])
                        break

        # Checks victory if the enemy's health is depleted
        win = self.health <= 0

        # Then resets all the values for the enemy and the team
        self.reset(*list(stats.values()))
        return win

    def take_turn(
        self,
        attacks: typing.Dict[
            str,
            typing.List[
                typing.Union[
                    int,
                    float,
                    typing.Tuple[
                        typing.Union[int, float],
                        typing.Tuple[typing.Union[int, float]],
                    ],
                ]
            ],
        ],
        target: Superhero,
    ):
        attack = random.choice(list(attacks.keys()))
        target_attacks = [
            p
            for p in zip(target.powers.values(), target.powers.keys())
            if p[0][0] == "attack"
        ]
        print(
            f"{self.name} used {attack.title()}"
            + (
                ""
                if attacks[attack][0] in ["heal steal", "attack buff"]
                else f" on {target.name}"
            )
            + "!"
        )
        attack = attacks[attack]
        if attack[0] in ["quick attack", "strong attack"]:
            target.status()
            print(f"Strength: {max(target_attacks)[0][1] if target_attacks else None}")
            action = input(
                "Do you [evade], [counter]attack, [guard], or do nothing? "
            ).lower()
            if action == "evade":
                if target.speed > 2 * attack[1]:
                    attack[1] = 0
                    print(
                        f"{target.name} {"narrowly" if attack[0] == "strong attack" else ""} "
                        f"avoided getting hit by {self.name}!"
                    )
                elif target.speed > 1.5 * attack[1]:
                    attack[1] = round_num(0.5 * attack[1])
                    print(f"{target.name} slightly avoided half the blow!")
                else:
                    print("You don't have the required speed to evade!")
            elif action == "counter":
                if attack[0] == "quick attack":
                    print(
                        f"While {target.name} was preparing to counterattack,"
                        f" they got quickly struck by {self.name}!"
                    )
                elif not target_attacks:
                    print("You have no attacks to counterattack!")
                elif (
                    target.brains < 140
                    and target.powers[max(target_attacks)[1]][1] <= 40
                ):
                    print(
                        "You don't have the required intelligence or strength to counterattack!"
                    )
                elif target.brains < 140:
                    print("You don't have the required intelligence to counterattack!")
                elif target.powers[max(target_attacks)[1]][1] <= 40:
                    print("You don't have the strength to counterattack!")
                else:
                    print(
                        f"{target.name} used {max(target_attacks)[1]} to counter {self.name}'s attack! \
                          They dealt {target.powers[max(target_attacks)[1]][1]} in retaliation!"
                    )
                    attack[1] = 0
                    self.health -= target.powers[max(target_attacks)[1]][1]
            elif action == "guard":
                print(f"{target.name} guarded 25% of {self.name}'s attack!")
                attack[1] = round_num(0.75 * attack[1])
            if attack[1] > 0:
                target.health -= attack[1]
                print(f"{self.name} dealt {attack[1]} to {target.name}!")
        elif attack[0] == "heal steal":
            time.sleep(1)
            map_data = [
                0,
                [5, 6],
                (
                    [True, [1, random.randint(2, 5)], [1, -1]],
                    [True, [5, random.randint(2, 5)], [-1, -1]],
                    [True, [1, random.randint(7, 10)], [1, 1]],
                    [True, [5, random.randint(7, 10)], [-1, 1]],
                ),
                [attack[1][0], 0, random.randint(0, 3)],
            ]
            if new_controls:
                new_control(*map_data)
                heals = end_result
            else:
                heals = game_map(*map_data)
            heal = sum([random.randint(*attack[1][1]) for _ in range(heals)])
            self.health += heal
            print(f"{self.name} healed {heals} times for a total of {heal} health!")
        elif attack[0] == "attack buff":
            for attack_name in attacks:
                if (
                    attacks[attack_name][0] == "quick attack"
                    or attacks[attack_name][0] == "strong attack"
                ):
                    attacks[attack_name][1] = round_num(
                        attacks[attack_name][1] * attack[1]
                    )
            print(f"Their attacks now deal {attack[1]*100 - 100}% more damage!")
        else:
            raise ValueError("This is not a real attack!")


def game_map(
    layout=1,
    coords=None,
    enemies=([True, [2, 4], [0, 0]], [True, [7, 2], [0, 0]]),
    chests=([True, [1, 2]], [True, [5, 12]], [True, [9, 2]], [True, [14, 10]]),
    conversation_flow=0,
    coords_change=(0, 0),
    message="What direction do you want to go? [w, a, s, d, stop]: ",
):
    try:
        if coords is None:
            coords = [2, 10]
            # I set the default value of coords to be None and configure it here because setting a mutable argument
            # might lead to issues later if it's called again with the same default value. A simple example:
            # def func(a=[1]):
            #     print(a)
            #     a[0] += 1
            #
            # for i in range(5):
            #     func()
        if clear_screen:
            os.system("cls" if os.name == "nt" else "clear")
        map_coords = (
            ([5, 6], [5, 6]),
            ([2, 10], [23, 2]),
            ([2, 12], [2, 2]),
            ([1, 16], [25, 2]),
            ([1, 2], [28, 18]),
            ([4, 2], [4, 2]),
        )
        enemy_coords = (
            (
                [True, [1, random.randint(2, 5)], [1, -1]],
                [True, [5, random.randint(2, 5)], [-1, -1]],
                [True, [1, random.randint(7, 10)], [1, 1]],
                [True, [5, random.randint(7, 10)], [-1, 1]],
            ),
            ([True, [2, 4], [0, 0]], [True, [7, 2], [0, 0]]),
            (
                [True, [0, 12], [1, 0]],
                [True, [1, 11], [1, 0]],
                [True, [0, 10], [1, 0]],
                [True, [1, 9], [1, 0]],
                [True, [0, 8], [1, 0]],
                [True, [1, 7], [1, 0]],
                [True, [0, 6], [1, 0]],
                [True, [1, 5], [1, 0]],
                [True, [0, 4], [1, 0]],
                [True, [1, 3], [1, 0]],
                [True, [0, 2], [1, 0]],
                [True, [5, 11], [1, 0]],
                [True, [4, 10], [1, 0]],
                [True, [5, 9], [1, 0]],
                [True, [4, 8], [1, 0]],
                [True, [5, 7], [1, 0]],
                [True, [4, 6], [1, 0]],
                [True, [5, 5], [1, 0]],
            ),
            (
                [True, [1, 4], [1, 1]],
                [True, [2, 4], [1, 1]],
                [True, [3, 4], [1, 1]],
                [True, [4, 4], [1, 1]],
                [True, [5, 4], [1, 1]],
                [True, [3, 5], [1, 1]],
                [True, [3, 6], [1, 1]],
                [True, [3, 7], [1, 1]],
            ),
            (
                [True, [23, 16], [-1, 1]],
                [True, [22, 17], [-1, 1]],
                [True, [21, 18], [-1, 1]],
                [True, [20, 18], [-1, 1]],
                [True, [19, 17], [-1, -1]],
                [True, [18, 16], [-1, -1]],
                [True, [17, 16], [-1, -1]],
                [True, [16, 15], [-1, -1]],
                [True, [15, 14], [-1, -1]],
                [True, [14, 14], [-1, -1]],
                [True, [13, 15], [-1, 1]],
                [True, [12, 16], [-1, 1]],
                [True, [11, 16], [-1, 1]],
                [True, [10, 17], [-1, 1]],
                [True, [9, 18], [-1, 1]],
                [True, [8, 18], [-1, 1]],
                [True, [7, 17], [-1, -1]],
                [True, [6, 16], [-1, -1]],
                [True, [5, 16], [-1, -1]],
                [True, [4, 15], [-1, -1]],
                [True, [3, 14], [-1, -1]],
                [True, [2, 14], [-1, -1]],
                [True, [1, 13], [-1, -1]],
                [True, [2, 12], [1, -1]],
                [True, [3, 12], [1, -1]],
                [True, [4, 11], [1, -1]],
                [True, [5, 10], [1, -1]],
                [True, [6, 10], [1, -1]],
                [True, [7, 9], [1, -1]],
                [True, [8, 8], [1, -1]],
            ),
            (
                [True, [1, 2], [1, 0]],
                [True, [0, 3], [1, 0]],
                [True, [1, 4], [1, 0]],
                [True, [0, 5], [1, 0]],
                [True, [1, 6], [1, 0]],
                [True, [0, 7], [1, 0]],
                [True, [1, 8], [1, 0]],
                [True, [0, 9], [1, 0]],
                [True, [1, 10], [1, 0]],
                [True, [0, 11], [1, 0]],
                [True, [6, 2], [1, 0]],
                [True, [5, 3], [1, 0]],
                [True, [6, 4], [1, 0]],
                [True, [5, 5], [1, 0]],
                [True, [6, 6], [1, 0]],
                [True, [5, 7], [1, 0]],
                [True, [6, 8], [1, 0]],
                [True, [5, 9], [1, 0]],
                [True, [6, 10], [1, 0]],
                [True, [5, 11], [1, 0]],
            ),
        )
        layouts = [
            l.split("\n")
            for l in [
                f"""
┌────{">" if not chests[2] else "─"}────┐
│         │
│         │
│         │
│         │
{">" if chests[2] == 2 else "│"}         {">" if chests[2] == 3 else "│"}
│         │
│         │
│         │
│         │
└────{">" if chests[2] == 1 else "─"}────┘
    """,
                color_text(
                    """
┌───────────────────────┐
│                       >
│   ┌───────────────────┘
│   │
│   │
│   │
│   │
│   │
│   │
│   │
└───┘
    """,
                    "bold",
                ),
                """
┌─>─┐
│| |│
│| |│
│| |└──┐
│|  + |│
│| |│ |│
│| |│ |│
│| |│ |│
│| |│ |│
│| |│ |│
│| |│ |│
│| |│ |│
└─<─┴──┘
    """,
                color_text(
                    """
┌──────────────────────────
│   |   |               | >
│ | | | |-------------- | │
│ | | | |               | │
│ | | | | --------------| │
│ | | | |               | │
│ | | | |-------------- | │
│ | | | |               | │
│ | | | | --------------| │
│ | | | |                 │
│ | | | |---------------- │
│ | | |                   │
│ | | |-------------------│
│ | |                     │
│ | --------------------- │
< |                       │
──────────────────────────┘
    """,
                    "light_blue",
                ),
                color_text(
                    """
─────────────────────────────┐
<                            │
│ ── ── ── ── ── ── ── ── ── │
│                            │
│ ── ── ── ── ── ── ── ── ── │
│                            │
├─────────────────────────── │
│                            │
│ ── ── ── ── ── ── ── ── ── │
│                            │
│ ── ── ── ── ── ── ── ── ── │
│                            │
│ ───────────────────────────┤
│                            │
│ ── ── ── ── ── ── ── ── ── │
│                            │
│ ── ── ── ── ── ── ── ── ── │
│                            >
└─────────────────────────────
    """,
                    "red",
                ),
                """
┌──┐<┌──┐
│  │ │  │
│  │ │  │
│  │ │  │
│  │ │  │
│  │ │  │
│  │ │  │
│  │ │  │
│  │ │  │
│  │ │  │
│  │◙│  │
└──┴─┴──┘
    """,
            ]
        ]
        if layout in [2, 3, 4] and not all([i[0] for i in enemies]):
            for enemy in enemies:
                enemy[0] = False
        coords[0] += coords_change[0]
        coords[1] += coords_change[1]
        if layouts[layout][coords[1]][coords[0]] in [
            "│",
            "─",
            "┌",
            "┐",
            "└",
            "┘",
            "|",
            "-",
        ]:
            return game_map(
                layout,
                coords,
                enemies,
                chests,
                conversation_flow,
                (-coords_change[0], -coords_change[1]),
                "Invalid direction! What direction do you want to go? [w, a, s, d, stop]: ",
            )
        for enemy in range(len(enemies)):
            if enemies[enemy][0]:
                moved = changed = False
                while not moved:
                    if enemies[enemy][2][0] or enemies[enemy][2][1]:
                        if not changed:
                            enemies[enemy][1][0] += enemies[enemy][2][0]
                            enemies[enemy][1][1] += enemies[enemy][2][1]
                        changed = False
                        if layouts[layout][enemies[enemy][1][1]][
                            enemies[enemy][1][0]
                        ] in ["┌", "┐", "└", "┘", "+"]:
                            changed = True
                            enemies[enemy][2][0] *= -1
                            enemies[enemy][2][1] *= -1
                            enemies[enemy][1][0] += 2 * enemies[enemy][2][0]
                            enemies[enemy][1][1] += 2 * enemies[enemy][2][1]
                            if layouts[layout][enemies[enemy][1][1]][
                                enemies[enemy][1][0]
                            ] in ["┌", "┐", "└", "┘", "+"]:
                                enemies[enemy][2][0] *= -1
                                enemies[enemy][2][1] *= -1
                                enemies[enemy][1][0] += enemies[enemy][2][0]
                                enemies[enemy][1][1] += enemies[enemy][2][1]
                        elif layouts[layout][enemies[enemy][1][1]][
                            enemies[enemy][1][0]
                        ] in ["<", ">"]:
                            if enemies[enemy][1][1] in [1, len(layouts[layout]) - 2]:
                                changed = True
                                enemies[enemy][2][1] *= -1
                                enemies[enemy][1][1] += 2 * enemies[enemy][2][1]
                            if enemies[enemy][1][0] in [
                                0,
                                len(layouts[layout][enemies[enemy][1][1]]) - 1,
                            ]:
                                changed = True
                                enemies[enemy][2][0] *= -1
                                enemies[enemy][1][0] += 2 * enemies[enemy][2][0]
                        elif (
                            layouts[layout][enemies[enemy][1][1]][enemies[enemy][1][0]]
                            == "│"
                        ):
                            changed = True
                            enemies[enemy][2][0] *= -1
                            enemies[enemy][1][0] += 2 * enemies[enemy][2][0]
                            if (
                                layouts[layout][enemies[enemy][1][1]][
                                    enemies[enemy][1][0]
                                ]
                                == "─"
                            ):
                                enemies[enemy][2][0] *= -1
                                enemies[enemy][1][0] += enemies[enemy][2][0]
                        elif (
                            layouts[layout][enemies[enemy][1][1]][enemies[enemy][1][0]]
                            == "─"
                        ):
                            changed = True
                            enemies[enemy][2][1] *= -1
                            enemies[enemy][1][1] += 2 * enemies[enemy][2][1]
                            if (
                                layouts[layout][enemies[enemy][1][1]][
                                    enemies[enemy][1][0]
                                ]
                                == "─"
                            ):
                                enemies[enemy][2][1] *= -1
                                enemies[enemy][1][1] += enemies[enemy][2][1]
                        else:
                            moved = True
                    else:
                        move, movement = random.choice([-1, 1]), random.randint(0, 1)
                        enemies[enemy][1][movement] += move
                        if layouts[layout][enemies[enemy][1][1]][
                            enemies[enemy][1][0]
                        ] in ["│", "─", "┌", "┐", "└", "┘", "!", "<", ">"]:
                            enemies[enemy][1][movement] -= move
                        else:
                            moved = True
                string_list = list(layouts[layout][enemies[enemy][1][1]])
                string_list[enemies[enemy][1][0]] = "◙"
                layouts[layout][enemies[enemy][1][1]] = "".join(string_list)
        if layout not in [0, len(layouts) - 1] and chests[layout - 1][0]:
            string_list = list(layouts[layout][chests[layout - 1][1][1]])
            string_list[chests[layout - 1][1][0]] = "!"
            layouts[layout][chests[layout - 1][1][1]] = "".join(string_list)
        if layout == 0:
            if chests[0] == 0:
                return chests[1]
            elif layouts[layout][coords[1]][coords[0]] == ">":
                chests[0] -= 1
                chests[2] = random.randint(0, 3)
                return game_map(0, map_coords[0][0], enemy_coords[0], chests, 0)
            elif layouts[layout][coords[1]][coords[0]] == "◙":
                chests[1] += 1
        else:
            with open(filepath, "w") as file:
                file.write(
                    f"[{layout}, {coords}, {enemies}, {chests}, "
                    f"{dict({k: v for k,v in characters.items() if k not in [
                               "Knight",
                               "Tank",
                               "Archer",
                               "Healer",
                               "Demon King"
                           ]})}]"
                )
            if layouts[layout][coords[1]][coords[0]] == ">":
                return game_map(
                    layout + 1,
                    map_coords[layout + 1][0],
                    enemy_coords[layout + 1],
                    chests,
                    0,
                )
            elif layouts[layout][coords[1]][coords[0]] == "<":
                return game_map(
                    layout - 1,
                    map_coords[layout - 1][1],
                    enemy_coords[layout - 1],
                    chests,
                    0,
                )
            elif layouts[layout][coords[1]][coords[0]] == "◙":
                if layout == len(layouts) - 1:
                    with open(filepath, "w") as file:
                        file.write(
                            f"[{layout}, {[4, 10]}, {enemies}, {chests}, "
                            f"{dict({k: v for k, v in characters.items() if k not in [
                                       "Knight",
                                       "Tank",
                                       "Archer",
                                       "Healer",
                                       "Demon King"
                                   ]})}]"
                        )
                    return [(layout, coords), enemies, chests]
                else:
                    enemies[[i[:-1] for i in enemies].index([True, coords])][0] = False
                return [(layout, coords), enemies, chests]
            elif layouts[layout][coords[1]][coords[0]] == "!":
                chests[chests.index([True, coords])][0] = False
                return [[(layout, coords), enemies, chests], ["chest", 5]]

        while "q" in inputs:
            inputs.remove("q")

        # Display map
        layouts[layout][coords[1]] = (
            layouts[layout][coords[1]][: coords[0]]
            + "○"
            + layouts[layout][coords[1]][coords[0] + 1 :]
        )
        print(
            f"○ - You\n◙ - Enemy\n> - Next room\n< - Previous room\n{coords}, "
            f"{layouts[layout][coords[1]]}{"\n".join(layouts[layout])}"
        )

        # Move player
        if new_controls:
            print(
                "If you do not see a new window appear, please exit the game and do not use new controls."
            )
        directions = {
            "up": (0, -1),
            "down": (0, 1),
            "left": (-1, 0),
            "right": (1, 0),
            "w": (0, -1),
            "a": (-1, 0),
            "s": (0, 1),
            "d": (1, 0),
        }

        # Conversations between the party (and new members)
        print("\n".join(conversations[layout][: int(conversation_flow / 5)]))

        while True:
            # Get direction
            if new_controls:
                while not inputs:
                    pass
                direction = inputs.pop()
                if direction == "q":
                    return
            else:
                direction = input(message).lower()

            # Handle direction
            if direction in directions:
                break
            elif direction.lower() == "stop":   # TODO (Does this cause an error?): in ["stop"]:
                return
            else:
                print("Invalid choice!")
        return game_map(
            layout,
            coords,
            enemies,
            chests,
            conversation_flow + 1,
            directions[direction],
        )
    except RecursionError:
        print("Too many moves! To prevent a memory crash, the game will now exit.")
        return time.sleep(2)
