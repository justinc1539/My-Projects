import requests
from bs4 import BeautifulSoup
import spotipy
from spotipy.oauth2 import SpotifyOAuth

date = "2000-08-12"  # input('What time? YYYY-MM-DD: ')
soup = BeautifulSoup(
    requests.get(f"https://www.billboard.com/charts/hot-100/{date}").text,
    "html.parser")
songs = [tag.text.strip() for tag in soup.select("li ul li h3")]
artists = soup.select("li ul li span")
artists = [tag.text.strip() for tag in artists if artists.index(tag) % 7 == 0]

sp = spotipy.Spotify(auth_manager=SpotifyOAuth("12b7446658d7470c8a06f575ff9726ff", "f99154ac31c14cc39546633be7e34204",
                                               "http://example.com", scope="playlist-modify-private"))
song_uris = []
for index in range(len(songs)):
    try:
        song_uris.append(sp.search(f"track:{songs[index]} year:" + date.split("-")[0])['tracks']['items'][0]["uri"])
    except IndexError or TypeError:
        pass
sp.playlist_add_items(sp.user_playlist_create(sp.current_user()["id"], f"{date} Billboard 100", False), song_uris)
