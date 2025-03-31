import requests

SHEETY_PRICES_ENDPOINT = "https://api.sheety.co/3c80b24b33ebba7586e177bc2b96e445/flightDeals/prices"


class DataManager:
    def __init__(self):
        self.destination_data = {}

    def get_destination_data(self):
        data = requests.get(SHEETY_PRICES_ENDPOINT).json()
        self.destination_data = data["prices"](data)
        return self.destination_data

    def update_destination_codes(self):
        for city in self.destination_data:
            response = requests.put(f"{SHEETY_PRICES_ENDPOINT}/{city['id']}",
                                    json={"price": {"iataCode": city["iataCode"]}})
