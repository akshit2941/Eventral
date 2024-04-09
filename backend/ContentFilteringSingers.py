import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import random

# Spotify API credentials
client_id = '682d22216c3d478c8ed1dfec7daff15d'
client_secret = 'aff78f04bd9543b9a1e979015794bcd1'

# Authenticate with Spotify API
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# Initialize lists
genre_list = []
artist_name = []

# Prompt user to enter their 5 favorite artists
print('Enter your 5 favourite artists:')
for i in range(5):
    artist = input()
    artist_name.append(artist)

# Function to fetch genres for an artist from Spotify
def get_audio_genre(artist_name):
    query = f"artist:{artist_name}"
    results = sp.search(q=query, type='artist', limit=10, offset=0)
    items = results['artists']['items']
    if items:
        genres = items[0]['genres']
        return genres
    else:
        return []  # Return an empty list if no genres are found

# Get genres for each artist
for i in range(5):
    genres = get_audio_genre(artist_name[i])
    genre_list.extend(genres) if genres else None  # Extend the list with genres from each artist if available

# Count the occurrences of each genre
genre_counts = {}
for genre in genre_list:
    if genre in genre_counts:
        genre_counts[genre] += 1
    else:
        genre_counts[genre] = 1

        


total_genres = len(genre_list)
genre_percentages = {genre: round((count / total_genres) * 100) for genre, count in genre_counts.items()}

total_percentage = sum(genre_percentages.values())

sorted_genres = sorted(genre_percentages.items(), key=lambda x: x[1], reverse=True)

top_10_genres = [genre for genre, _ in sorted_genres[:10]]

print("Your Top Genre")
print(genre_list)

# Print the top 10 genres
print("Your Top 10 Genres:")
print(top_10_genres)

#random artist
def get_random_artist_by_genre(genre):
    # Search for artists based on the provided genre
    results = sp.search(q=f"genre:{genre}", type='artist', limit=10)
    artists = results['artists']['items']
    
    if not artists:
        return None
    else:
        # Pick a random artist from the list
        random_artist = random.choice(artists)
        return random_artist['name']

all_artists = []  # List to store randomly picked artists from all genres
max_artist = 10

# Iterate over each genre and fetch a random artist
for genre in top_10_genres:
    random_artist = get_random_artist_by_genre(genre)
    if random_artist:  # Check if random artist is found for the genre
        all_artists.append(random_artist)  # Add random artist to the combined list

remaining_artist = max_artist - len(all_artists)
# print(remaining_artist)

# for i in range(remaining_artist):
    
# Print the combined list of randomly picked artists
print("\nCombined List of Recommended Picked Artists:")
for artist in all_artists:
    print(artist)