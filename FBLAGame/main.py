#!/usr/bin/env python3.13
import math
import rpg
import os
import time
import random
import re

# Initialize characters and enemies (non-bosses go to the normal sub-dictionary)
characters = {}
enemies = {"normal": {}}


def main(intro=False):
    # Displays Options and asks for choice
    if intro:
        print(f"Menu\nS - Start\nC - Create Custom Character\nQ - Quit")
    choice = input("Choice: ").upper()

    # Handle Choices
    if choice == "Q":
        return print("Your adventure awaits!")
    elif choice == "S":
        # Creates the saves directory if it doesn't exist
        try:
            if not os.path.exists("saves"):
                os.makedirs("saves")  # Use makedirs for nested directories
        except OSError as e:
            print(f"An unexpected error occurred: {e}")

        files = [
            f"saves/{f}"
            for f in os.listdir("saves")
            if f[:9] + f[-4:] == "map_data_.txt" and f[9:-4].isnumeric()
        ]
        print("#New")
        if files:
            for f in files:
                # Display file number and last modified date
                print(
                    time.strftime(
                        f"Save file #{f[15:-4]} (%m/%d/%Y %I:%M:%S %p)",
                        time.localtime(os.path.getmtime(f)),
                    )
                )
            print("#Delete")
        print("#Quit")
        while True:
            choice = input("What would you like to choose? #").lower()
            if choice == "new":
                iteration = 1
                while str(iteration) in [f[15:-4] for f in files]:
                    iteration += 1
                rpg.filepath = f"saves/map_data_{iteration}.txt"
                start(characters)
                break
            elif choice in [f[15:-4] for f in files]:
                rpg.filepath = f"saves/map_data_{choice}.txt"
                with open(rpg.filepath) as file:
                    data = eval(file.read().replace("inf", "math.inf"))
                    start(data[-1] | characters, data[:-1])
                break
            elif choice == "delete" and files:
                choice = input("Which file would you like to delete? #")
                if choice in [f[15:-4] for f in files]:
                    filepath = f"saves/map_data_{choice}.txt"
                    try:
                        os.remove(filepath)
                        print(f"Save file #{choice} removed successfully.")
                    except PermissionError:
                        print(
                            f"Error: Permission denied to remove file '{filepath}'. "
                            "Please run the program with elevated permissions."
                        )
                    except OSError as e:
                        print(f"An unexpected error occurred: {e}")
                else:
                    print("Invalid choice!")
            elif choice == "quit":
                break
            else:
                print("Invalid choice!")
    elif choice == "C":
        create(characters)
    else:
        print("Invalid choice!")

    # Main loop
    main()


def start(char_data, map_data=()):
    # Warns the user if standard output is not connected to a terminal
    if not os.isatty(1):
        print(
            "The console you are running this program in does not connected to a terminal, meaning it likely does not "
            "support ANSI Codes. However, to see what the console can do, the following tests will be performed."
        )
        rpg.use_colors = (
            input(rpg.color_text("Is this text red? [Y/N]: ", "red")).lower() == "y"
        )
        rpg.clear_screen = (
            input("Did the screen clear of any text besides this line? [Y/N]: ").lower()
            == "y"
        )

    new_controls = (
        input(
            "Would you like to use your keyboard (WASD or ↑←↓→) to move? The other option is to "
            "manually type out the direction (prompting "
            "'What direction do you want to go?'). [Y/N]: "
        ).lower()
        == "y"
    )
    rpg.new_controls = new_controls
    rpg.characters = char_data

    # Imports custom characters
    if map_data:
        while input("Would you like to add a custom character? [Y/N]: ").lower() == "y":
            create(char_data)
    custom_character_names = [
        name for name in char_data.keys() if name != "The Transmitter"
    ]  # characters names for cutscenes/dialogue
    # TODO: Before 3/11/2025 9:11 AM (Lines 103-104)
    random_name = lambda: random.choice(custom_character_names)

    # Creates in-map conversations
    rpg.conversations = [
        [],
        [
            "Knight: Gather, everyone. Today is the day we strike down the Demon King.",
            "Tank: AWW YEAH!!! IT'S ABOUT TIME WE SHOW HIM WHO'S BOSS!",
            "Archer: Keep it down, will you? I do not want to get startled when I'm aiming my bow.",
        ]
        + (
            [
                f"{random_name()}: Can {"we" if len(custom_character_names) > 1 else "I"} join too?",
                "Healer: Sure! It's great to have more party members.",
            ]
            if custom_character_names
            else []
        ),
        [
            "Knight: Huzzah! Such a bothersome snake is no match for us!",
            "Archer: Ugh, is it even dead?",
            "Healer: If it's still crawling, likely not.",
        ],
        (
            [
                "Knight: It's great to have you with us, sir.",
                "The Transmitter: 01000001 01101100 01110011 01101111 00100000 01100111 01110010 01100101 01100001 "
                "01110100 00100000 01110100 01101000 01100001 01110100 00100000 01001001 00100000 01100110 01101111 "
                "01110101 01101110 01100100 00100000 01111001 01101111 01110101 00100000 01100111 01110101 01111001 "
                "01110011 00101110\n(Also great that I found you guys.)",
                "The Transmitter: 01001001 00100000 01110111 01100001 01110011 00100000 01110111 01101111 01110010 "
                "01110010 01101001 01100101 01100100 00100000 01101110 01101111 01100010 01101111 01100100 01111001 "
                "00100000 01110111 01101111 01110101 01101100 01100100 00100000 01100100 01100001 01110010 01100101 "
                "00100000 01110100 01101111 00100000 01110011 01110100 01100001 01101110 01100100 00100000 01100001 "
                "01100111 01100001 01101001 01101110 01110011 01110100 00100000 01001000 01001001 01001101 00101110"
                "\n(I was worried nobody would dare to stand against HIM.)",
            ]
            if "The Transmitter" in char_data
            else [
                "Tank: WHO DOES HE THINK HE IS?!",
                "Archer: I said keep quiet! Gosh you are annoying...",
                "Healer: What should we do?",
                "Archer: Avoid him, obviously.",
            ]
            + (
                [
                    f"{random_name()}: Perhaps we can fight him?",
                    f"{random_name()}: You never know, it might work.",
                ]
                if custom_character_names
                else []
            )
            + ["Healer: Whatever we're planning, we ought to do so with care."]
        ),
        [
            "Archer: Seriously, an even LONGER snake?! This feels unnecessary.",
            "Knight: It's clear we may need to stop if we dare not to engage it.",
        ]
        + (
            [
                "Archer: But how? Everyone only seems to move when we move.",
                f"{random_name()}: Perhaps running against a wall counts as moving?",
                "Healer: Seems like a good idea!",
            ]
            if custom_character_names
            else []
        )
        + ["Tank: ARE YOU KIDDING?! CHARGE!!!"],
        [
            rpg.color_text("Well, well, well. Who do we have here?", "random"),
            rpg.color_text("You dare challenge me?", "random"),
            rpg.color_text("Very well then. COME AT ME!!!", "random"),
            rpg.color_text("Mwahahahaha...", "random"),
            rpg.color_text("...", "random"),
            rpg.color_text("...", "random"),
            rpg.color_text("Scared, are we now?", "random"),
            rpg.color_text("YOU SHOULD BE.", "random"),
        ],
    ]

    # Starting dialogue
    dialogue(
        "An entourage takes on the Demon King! It consists of...\nthe Knight, a sword wielder...\nthe Tank, "
        "fully armored...\nthe Archer, armed and ready to fire...\nand the Healer, watching over the team."
        + (
            f"\nThey are joined by {", ".join(list(char_data))}, ready to support the rest."
            if char_data
            else ""
        )
    )

    # Imports base characters
    char_data["Knight"] = [
        "Knight",
        150,
        100,
        50,
        {"Raise Sword": ["attack buff", 2], "Slash": ["attack", 25]},
    ]
    char_data["Tank"] = [
        "Tank",
        500,
        30,
        10,
        {"Slam": ["attack", 100], "Shout": ["attack debuff", 0.95]},
    ]
    char_data["Archer"] = [
        "Archer",
        30,
        90,
        100,
        {"Fire": ["attack", 30], "Hasten": ["evade", 30]},
    ]
    char_data["Healer"] = [
        "Healer",
        math.inf,
        120,
        1,
        {"Heal": ["heal", 30], "Enfeeble": ["attack debuff", 0.98]},
    ]

    # Creates enemies
    # Name, Health, Attacks, Team=char_data
    enemies["normal"]["Zombie"] = rpg.Enemy(
        "Zombie",
        50,
        {"bite": ["heal steal", (3, (5, 10))]},
        char_data,
    )
    # enemies["normal"]["Agent"] = rpg.Enemy(
    #     "Agent", 75, {"shoot": ["quick attack", 10]}, char_data
    # )
    enemies["Giant Snake"] = rpg.Enemy(
        "Giant Snake",
        300,
        {
            "charge": ["strong attack", 80],
            "tail spin": ["quick attack", 30],
            "bite": ["heal steal", (3, (10, 20))],
        },
        char_data,
    )
    enemies["The Transmitter"] = rpg.Enemy(
        "The Transmitter",
        200,
        {
            "anti-virus annihilation": ["strong attack", 40],
            "registry rearrangement": ["attack buff", 1.2],
            "transmit": ["heal steal", (5, (8, 15))],
        },
        char_data,
    )
    enemies["Demon King"] = rpg.Enemy(
        "Demon King",
        500,
        {
            "enrage": ["attack buff", 1.3],
            "cross slash": ["quick attack", 25],
            "flame breath": ["strong attack", 60],
        },
        char_data,
    )
    # I add char_data as an argument because in Python lists and dicts pass by object reference not by value, meaning
    # any change to the dictionary (besides reassigning it entirely) also affects the dictionary attribute when
    # assigned in rpg.Enemy.__init__

    # Start
    level = [1, 0, 10]
    if new_controls:
        rpg.new_control(*map_data)
        last_coords = rpg.end_result
    else:
        last_coords = rpg.game_map(*map_data)  # Start/Continue

        # DEBUG
        # level, last_coords = [1, 0, 10], rpg.game_map(1, [23, 2], ([False], [False]))  # Layout 1 end
        # level, last_coords = [2, 0, 100], rpg.game_map(2, [2, 2], ([False], [False]))  # Layout 2 end
        # level, last_coords = [3, 0, 1000], rpg.game_map(3, [25, 2], ([False], [False]))  # Layout 3 end
        # level, last_coords = [3, 500, 1000], rpg.game_map(4, [28, 18], ([False], [False]))  # Layout 4 end
    while True:
        level_up = False
        if not last_coords:
            return input("Game saved. (press enter to continue)")
        elif last_coords[-1][0] == "chest":
            xp = 250
            print(f"Congratulations! You found a chest. You got {xp} experience.")
            level[1] += xp
            while level[1] > level[2]:
                level_up = True
                level[0] += 1
                level[1] -= level[2]
                level[2] *= 5
            if level_up:
                print(f"You leveled up! You are now level {level[0]}. ")
            input(
                f"Get {level[2] - level[1]} more experience to get to the next level!"
                if level[2] < int("1" * 10**3)
                else "Don't even bother trying to get to the next level."
            )
            last_coords = last_coords[0]
        elif "The Transmitter" not in char_data or last_coords[0][0] != 3:
            if last_coords[0][0] in [2, 4]:
                enemy, xp = enemies["Giant Snake"], 500
            elif last_coords[0][0] == 3:
                enemy, xp = enemies["The Transmitter"], 250
            elif last_coords[0][0] == 5:
                enemy, xp = enemies["Demon King"], int("9" * 10**3)
                dialogue(
                    "You think you are above me?\nI am the strongest being in this entire world.\n"
                    "You should have considered enjoying your life instead of having it taken away from you!",
                    rainbow=True,
                )
                if custom_character_names:
                    text = [
                        "It has been far too long since you have run rampant in our lives.",
                        "Always controlling and causing havoc to the once peaceful lands!",
                        "It's about time we stopped you from harming innocent people.",
                    ]
                    dialogue([f"{random_name()}: {t}" for t in text])
                if "The Transmitter" in char_data:
                    dialogue(
                        "The Transmitter: 01001110 01101111 00100000 01101100 01101111 01101110 01100111 01100101 "
                        "01110010 00101110 00100000 01001001 00100000 01110010 01100101 01100001 01101100 "
                        "01101001 01111010 01100101 00100000 01111001 01101111 01110101 00100000 01100100 "
                        "01101111 00100000 01101110 01101111 01110100 00100000 01100011 01101111 01101110 "
                        "01110100 01110010 01101111 01101100 00100000 01101101 01111001 00100000 01101100 "
                        "01101001 01100110 01100101 00101100 00100000 01100001 01101100 01110111 01100001 "
                        "01111001 01110011 00100000 01110100 01101111 01110010 01110100 01110101 01110010 "
                        "01101001 01101110 01100111 00100000 01101101 01111001 00100000 01101011 01101001 "
                        "01101110 01100100 00100000 01100110 01101111 01110010 00100000 01111001 01101111 "
                        "01110101 01110010 00100000 01101111 01110111 01101110 00100000 01110000 01101100 "
                        "01100101 01100001 01110011 01110101 01110010 01100101 00101110\n(No longer. I realize "
                        "you do not control my life, always torturing my kind for your own pleasure.);"
                        "The Transmitter: 01001011 01101110 01101111 01110111 01101001 01101110 01100111 00100000 "
                        "01101101 01111001 00100000 01101110 01100101 01110111 00100000 01100110 01110010 "
                        "01101001 01100101 01101110 01100100 01110011 00101100 00100000 01001001 00100000 "
                        "01110111 01101001 01101100 01101100 00100000 01101110 01100101 01110110 01100101 "
                        "01110010 00100000 01101100 01100101 01110100 00100000 01101101 01111001 00100000 "
                        "01101100 01101001 01100110 01100101 00100000 01100010 01100101 00100000 01101001 "
                        "01110011 01101111 01101100 01100001 01110100 01100101 01100100 00100000 01100001 "
                        "01101110 01111001 01101101 01101111 01110010 01100101 00101110\n(Knowing my new "
                        "friends, I will never let my life be isolated anymore.)",
                        ";",
                    )
            else:
                enemy, xp = random.choice(list(enemies["normal"].values())), 100
            if enemy.encounter(level[0]):  # Initiates battle and checks for victory
                level[1] += xp
                while level[1] > level[2]:
                    level_up = True
                    level[0] += 1
                    level[1] -= level[2]
                    level[2] *= 5
                print(f"You won! You gained {xp} experience.")
                if last_coords[0][0] == 3:  # The Transmitter joins the team
                    dialogue(
                        "The Transmitter: 01000101 01110110 01100101 01110010 01111001 01101111 01101110 "
                        "01100101 00100000 01100010 01100001 01101110 01100100 01101001 01101110 01100111 "
                        "00100000 01110100 01101111 01100111 01100101 01110100 01101000 01100101 01110010 "
                        "00101100 00100000 01110101 01101110 01101001 01110100 01100101 01100100 00100000 "
                        "01101001 01101110 00100000 01100001 00100000 01110011 01101001 01101110 01100111 "
                        "01101100 01100101 00100000 01100111 01101111 01100001 01101100 00101110\n"
                        "(Everyone banding together, united in a single goal.);"
                        "The Transmitter: 01001101 01111001 00100000 01101011 01101001 01101110 01100100 "
                        "00100000 01110111 01100001 01110011 00100000 01100110 01101111 01110010 01100011 "
                        "01100101 01100100 00100000 01110100 01101111 00100000 01110011 01100101 01110010 "
                        "01110110 01100101 00100000 01110101 01101110 01100100 01100101 01110010 00100000 "
                        "01110100 01101000 01100101 00100000 01000100 01100101 01101101 01101111 01101110 "
                        "00100000 01001011 01101001 01101110 01100111 00101100 00100000 01110111 01101000 "
                        "01101111 00100000 01101001 01110011 01101111 01101100 01100001 01110100 01100101 "
                        "01100100 00100000 01110101 01110011 00100000 01110100 01101111 00100000 01110111 "
                        "01101111 01110010 01101011 00100000 01100001 01110011 00100000 01110011 01101100 "
                        "01100001 01110110 01100101 01110011 00101100 00100000 01101101 01101001 01101110 "
                        "01101001 01101110 01100111 00100000 01100001 01101100 01101100 00100000 01100010 "
                        "01111001 00100000 01101111 01110101 01110010 01110011 01100101 01101100 01110110 "
                        "01100101 01110011 00101110\n(My kind was forced to serve under the Demon King, "
                        "who isolated us to work as slaves, mining all by ourselves.);"
                        "The Transmitter: 01001001 00100000 01110111 01101001 01101100 01101100 00100000 "
                        "01101010 01101111 01101001 01101110 00100000 01111001 01101111 01110101 00100000 "
                        "01100001 01101110 01100100 00100000 01100110 01110010 01100101 01100101 00100000 "
                        "01101101 01111001 00100000 01101011 01101001 01101110 01100100 00100000 01100110 "
                        "01110010 01101111 01101101 00100000 01101000 01101001 01110011 00100000 01100101 "
                        "01110110 01101001 01101100 00100000 01100111 01110010 01100001 01110011 01110000 "
                        "00101110\n(I will join you and free my kind from his evil grasp.)",
                        ";",
                    )
                    char_data["The Transmitter"] = [
                        "The Transmitter",
                        200,
                        125,
                        10,
                        {
                            "Transmit": ["heal", 30],
                            "Registry Rearrangement": ["attack buff", 1.15],
                            "Anti-virus Annihilation": ["attack", 20],
                        },
                    ]
                rpg.conversations[3] = [
                    "Knight: It's great to have you with us, sir.",
                    "The Transmitter: 01000001 01101100 01110011 01101111 00100000 01100111 01110010 01100101 01100001 01110100 00100000 01110100 01101000 01100001 01110100 00100000 01001001 00100000 01100110 01101111 01110101 01101110 01100100 00100000 01111001 01101111 01110101 00100000 01100111 01110101 01111001 01110011 00101110\n(Also great that I found you guys.)",
                    "The Transmitter: 01001001 00100000 01110111 01100001 01110011 00100000 01110111 01101111 01110010 01110010 01101001 01100101 01100100 00100000 01101110 01101111 01100010 01101111 01100100 01111001 00100000 01110111 01101111 01110101 01101100 01100100 00100000 01100100 01100001 01110010 01100101 00100000 01110100 01101111 00100000 01110011 01110100 01100001 01101110 01100100 00100000 01100001 01100111 01100001 01101001 01101110 01110011 01110100 00100000 01001000 01001001 01001101 00101110\n(I was worried nobody would dare to stand against HIM.)",
                ]
                if level_up:
                    print(f"You leveled up! You are now level {level[0]}. ")
                input(
                    f"Get {level[2] - level[1]} more experience to get to the next level!"
                    if level[2] < int("1" * 10**3)
                    else "Don't even bother trying to get to the next level."
                )
                if last_coords[0][0] == 5:  # End game
                    return dialogue(
                        "Congratulations! You beat the Demon King;Peace is finally restored across the land."
                        ";The end\nGame made by Justin Chua",
                        ";",
                    )
            else:
                input("You lost!")
        map_data = [
            last_coords[0],
            {"enemies": last_coords[1], "chests": last_coords[2]},
        ]
        if new_controls:
            rpg.new_control(*map_data[0], **map_data[1])
            last_coords = rpg.end_result
        else:
            last_coords = rpg.game_map(*map_data[0], **map_data[1])


def create(char_data):
    attack_types = ["attack", "evade", "heal", "attack buff", "attack debuff"]
    while True:
        name = input("Jumping into action is: ").title()
        if name == "Knight":
            print("Sorry good sir, this is my name.")
        elif name == "Tank":
            print("MY. NAME.")
        elif name == "Archer":
            print("Yeah, not happening.")
        elif name == "Healer":
            print("Please no!")
        elif name == "The Transmitter":
            print(
                "01010101 01110011 01100101 00100000 01100001 01101110 01101111 01110100 01101000 01100101 "
                "01110010 00100000 01101110 01100001 01101101 01100101 00101110\n(Use another name.)"
            )
        elif name == "Demon King":
            return
        else:
            break
    char_data[name] = {}
    for stat in ["health", "speed", "brains"]:
        while True:
            char_data[name][stat] = input(f"How much {stat} do {name} have? ")
            if str_to_num(char_data[name][stat]):
                char_data[name][stat] = str_to_num(char_data[name][stat])
                break
            print("Invalid value!")
    char_data[name] = [name] + list(char_data[name].values())
    powers = {}
    while True:
        power = input("What is their power called? (enter nothing if done): ").title()
        if not power:
            break
        while True:
            power_type = input(
                f"What is your power type? [{", ".join(attack_types)}]: "
            ).lower()
            if power_type in attack_types:
                break
            print("Invalid choice!")
        while True:
            power_value = input(f"How much '{power_type}' is this? ")
            if str_to_num(power_value):
                powers[power.title()] = [power_type, str_to_num(power_value)]
                break
            print("Invalid choice!")
    char_data[name].append(
        powers if powers else {"Touch Of Death": ["attack", math.inf]}
    )

    print(f"Welcome to the team, {name}!")
    rpg.Superhero(*char_data[name]).status()


def dialogue(text, delimiter="\n", rainbow=False):
    """Displays text for a character's dialogue.

    Separates the text by a delimiter and displays each one consecutively.
    Utilizes random colors to add a rainbow effect.

    Args:
        text: The text to display.
        delimiter: The character that splits the text to multiple segments.
        rainbow: Decides whether to create a rainbow effect.
    """
    if rainbow:
        for text in text if type(text) == list else text.split(delimiter):
            if rpg.clear_screen:
                i = 0
                while i < 100:
                    print(rpg.color_text(text, "random"))
                    os.system("cls" if os.name == "nt" else "clear")
                    i += 1
            else:
                print("".join([rpg.color_text(t, "random") for t in text]))
                time.sleep(5 / 3)
    else:
        [input(i) for i in (text if type(text) == list else text.split(delimiter))]


def str_to_num(string):
    """Convert a string to a number.

    A reformed function of the method str.isnumeric() using Regular Expression.
    Numbers in the math module (e.g. inf) are also included.


    Args:
        string: The string to check and convert.

    Returns:
        The number value if it is a valid number, False otherwise.
    """
    try:
        return eval(f"math.{string}")
    except (SyntaxError, AttributeError, NameError):
        return (
            eval(string)
            if bool(re.match(r"^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$", string))
            else False
        )

    # str.isnumeric() does not work for decimal or negative values.
    # This function accepts more numeric strings, making a robust check.


try:
    main(True)
except KeyboardInterrupt:
    # Just in case the user Ctrl+C while playing the game
    rpg.inputs.append("q")
    print("Your adventure awaits!")
