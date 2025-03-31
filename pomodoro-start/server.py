import socket
from mathyo import *
from _thread import *

server = "10.0.0.137"
port = 5555

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    s.bind((server, port))
except socket.error as e:
    print(str(e))

try:
    s.listen(2)
except OSError:
    try:
        s.connect((server, port))
    except ConnectionRefusedError:
        s.listen(2)
        print('fixed it w')
else:
    print('worked first time w')
print("Server Started, Waiting for a connection...")


def threaded_client(player):
    global conn
    conn.send(str.encode(f"You are Player {player}"))
    cards = []
    while True:
        try:
            data = conn.recv(2048).decode("utf-8")

            if not data:
                print("Disconnected")
                break
            elif data[:-1] == "cards":
                 reply = f"[]"
            else:
                print("Recieved:", data)
                reply = input("Reply: ")

            conn.sendall(str.encode(reply))
        except ConnectionResetError:
            break

    print("Lost connection")
    conn.close()


cPlayer = 0
while True:
    conn, addr = s.accept()
    print("Connected to:", addr)

    start_new_thread(threaded_client, cPlayer)
    cPlayer += 1
