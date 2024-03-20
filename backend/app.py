from flask import Flask, request, jsonify
import spotipy
import random
from spotipy.oauth2 import SpotifyClientCredentials

app = Flask(_name_)

# Set your Spotify API credentials
client_id = 'client id'
client_secret = 'client secret'

# Initialize Spotify client
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

@app.route('/artistimage', methods=['GET'])
def get_artist_image():
    artist_name = request.args.get('artist_name')
    if not artist_name :
        return jsonify({'error': 'Artist_name parameters is required'})

    def find_song_uri(artist_name,):
        query = f"artist:{artist_name}"
        results = sp.search(q=query, type='artist',limit=10, offset=0)
        items= results['artists']['items']
        if len(items) > 0:
            artist= items[0]
            return artist['name'],artist['images'][0]['url']    
    song_uri = find_song_uri(artist_name)
    
    if song_uri:
        # You can now use the retrieved song_uri for further operations, such as getting audio features.
        song_uris = []
        song_uris.append(song_uri)
        print(find_song_uri(artist_name))
        result = {
            'artist_name': song_uri[0],
            'artist_image': song_uri[1],
        }
        return jsonify(result)
    else:
        return jsonify({'error': 'Song not found'})
    pass
#app route 2 starts here
    
@app.route('/recommendedartist',methods=['POST'])
def recommended_artist():
    genre_list = []
    # artist_name = []
    data = request.json
    artist_name = data['my_list']
    # Prompt user to enter their 5 favorite artists
    # print('Enter your 5 favourite artists:')
    # for i in range(5):
    #     artist = input()
    #     artist_name.append(artist)
    print(artist_name)
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
    return jsonify(all_artists)
    

# Rest of the code remains the same



if _name_ == '_main_':
    app.run(host='0.0.0.0', port=8080, debug=True)
    app.run(debug=True)