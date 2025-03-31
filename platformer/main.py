import pgzrun
from random import randint

WIDTH = 600
HEIGHT = 600

score = 0
time = 0
number_of_updates = 0
game_over = False

fox = Actor("fox")
fox.pos = 100, 100

hedgehog = Actor("hedgehog")
hedgehog.pos = 100, 200

coin = Actor("coin")
coin.pos = 200, 200


def draw():
    screen.fill("green")
    fox.draw()
    hedgehog.draw()
    coin.draw()
    screen.draw.text("Score: " + str(score), color="black", topleft=(10, 10))
    screen.draw.text("Game running for: " + str(time) + "/21 seconds", color="black", topleft=(10, 20))

    if game_over:
        screen.fill("pink")
        screen.draw.text("Score: " + str(score), color="black", topleft=(10, 10))


def place_coin():
    coin.x = randint(20, (WIDTH - 20))
    coin.y = randint(20, (HEIGHT - 20))


def time_up():
    global game_over
    game_over = True


def update():
    global score, number_of_updates, time, game_over

    if keyboard.left:
        fox.x -= 2
    if keyboard.right:
        fox.x += 2
    if keyboard.up:
        fox.y -= 2
    if keyboard.down:
        fox.y += 2
    if keyboard.A:
        hedgehog.x -= 2
    if keyboard.D:
        hedgehog.x += 2
    if keyboard.W:
        jump = 5
        for i in range(jump*2):
            print(jump)
            hedgehog.y += jump
            jump -= 1
    if keyboard.S:
        hedgehog.y += 20
    if number_of_updates == 59:
        number_of_updates = 0
        time += 1
    else:
        number_of_updates += 1
    coin_collected = fox.colliderect(coin)
    coin_collectedd = hedgehog.colliderect(coin)

    if coin_collected:
        score = score + 10
        place_coin()
    if coin_collectedd:
        score = score + 10
        place_coin()


clock.schedule(time_up, 21.0)
place_coin()
pgzrun.go()
