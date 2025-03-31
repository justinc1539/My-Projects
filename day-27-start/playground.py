# *args: Positional Variable-Length Arguments
def add(*args):
    print(args)
    sum = 0
    for n in args:
        sum += n
    # print(sum)


add(3, 5, 6, 2, 1, 7, 4, 3)


# **kwargs: Keyworded Variable-Length Arguments
def calculate(n, **kwargs):
    print(kwargs)
    # for key, value in kwargs.items():
    #     print(key)
    #     print(value)
    if kwargs.get("add"):
        n += kwargs["add"]
    if kwargs.get("multiply"):
        n *= kwargs["multiply"]
    # print(n)


calculate(2, add=3, multiply=5)


# How to use a **kwargs dictionary safely
class Car:
    def __init__(self, **kw):
        self.make = kw.get("make")
        self.model = kw.get("model")
        self.colour = kw.get("colour")
        self.seats = kw.get("seats")


my_car = Car(make="Nissan", model="Skyline")
print(my_car.model)
