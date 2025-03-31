import socket


class Network:
    def __init__(self):
        self.client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server = "10.0.0.137"
        self.port = 5555
        self.addr = (self.server, self.port)
        self.start = self.connect()

    def get_start(self):
        return self.start

    def connect(self):
        # try:
        self.client.connect(self.addr)
        return self.client.recv(2048).decode()
        # except:
        #     pass

    def send(self, data):
        try:
            self.client.send(str.encode(data))
            return self.client.recv(2048).decode()
        except socket.error as e:
            print(e)
