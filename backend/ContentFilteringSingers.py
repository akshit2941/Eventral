import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import random

client_id = '682d22216c3d478c8ed1dfec7daff15d'
client_secret = 'aff78f04bd9543b9a1e979015794bcd1'

client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

ted_talkers = [
    ["Shashi Tharoor", "International affairs, history, literature", "https://images.indianexpress.com/2024/02/Modis-hope-of-two-digits-in-Kerala-could-be-zero-and-zero-Shashi-Tharoor.jpg?resize=600,338"],
    ["Nandan Nilekani", "Technology, innovation, governance", "https://www.infosys.com/content/dam/infosys-web/en/global-resource/photos/nandan.jpg"],
    ["Kiran Bedi", "Leadership, empowerment, social change", "https://www.teahub.io/photos/full/298-2984621_kiran-bedi-3d.jpg"],
    ["Kiran Sethi", "Education, creativity, social entrepreneurship", "https://assets.lybrate.com/f_auto,c_limit,w_384,q_auto/img/documents/doctor/dp/3c476a4eb047b3d08d124211acca89c4/Dermatology-KiranKaurSethi-Delhi-6dc586"],
    ["Mallika Sarabhai", "Dance, social justice, women's rights", "https://www.culturalindia.net/iliimages/2_1.jpg"],
    ["Sunitha Krishnan", "Human trafficking, rehabilitation, social justice", "https://alchetron.com/cdn/sunitha-krishnan-c32d983c-8fe9-4ffd-a809-d91e3686165-resize-750.jpeg"],
    ["Hans Rosling", "Global health, development, data visualization", "https://uw-s3-cdn.s3.us-west-2.amazonaws.com/wp-content/uploads/sites/132/2020/09/30205402/hans_rosling.jpg"],
    ["Pranav Mistry", "Technology, innovation, human-computer interaction", "https://d29zunrt9sid73.cloudfront.net/speaker_media/asset/41046/portrait_xl_70_TEd_PM.jpeg"],
    ["Sugata Mitra", "Self-organized learning environments, education, child development", "https://londonspeakerbureau.com/wp-content/uploads/2017/04/Sugata-Mitra-Keynote-Speaker-300x300.jpg"],
    ["Bunker Roy", "Rural development, sustainability, community empowerment", "https://pi.tedcdn.com/r/s3.amazonaws.com/talkstar-photos/uploads/c84975fe-4c8a-4044-9f4b-c814031d49c9/BunkerRoy_2011G-embed.jpg?cb=20160511&quality=63&u=&w=512"],
    ["R.A. Mashelkar", "Innovation, technology, entrepreneurship", "https://chartwellspeakers.b-cdn.net/wp-content/uploads/2013/11/RA-Mashelkar-Wordpress.jpg"],
    ["Devdutt Pattanaik", "Mythology, culture, storytelling", "https://m.media-amazon.com/images/S/amzn-author-media-prod/45kf1posr24aric3h4g3ht7lk9._SX450_.jpg"],
    ["Sheena Iyengar", "Choice, decision-making, psychology", "https://i0.wp.com/sheenaiyengar.com/wp-content/uploads/2020/07/SheenaIyengargivingattalkatTEDconference.jpeg?resize=640,360&ssl=1"],
    ["Manu Prakash", "Frugal science, innovation, global health", "https://profiles.stanford.edu/proxy/api/cap/profiles/21128/resources/profilephoto/350x350.1509521098302.jpg"],
    ["Lakshmi Pratury", "Storytelling, entrepreneurship, innovation", "https://nettv4u.com/uploads/01-01-2024/stunning-stills-of-shirley-setia.png"]
]


comedians = [
    ["Zakir Khan", "https://hamariweb.com/profiles/images/profile/1812-166-10043.jpg", "77.5 Lakh", "Observational Humor"],
    ["Biswa Kalyan Rath", "https://m.media-amazon.com/images/S/pv-target-images/c122c33c7abb41c06f4dcb0dca5410ac0d968ec6d4546060dd4493b2eb39ec0d.jpg", "6.77 Lakh", "Social Commentary"],
    ["Kanan Gill", "https://m.media-amazon.com/images/M/MV5BMGRmYmEzODYtY2VjMi00ZDEyLWJkZDEtZTc0OWUyMDhkOWJiXkEyXkFqcGdeQXVyOTAyMDgxODQ@.jpg", "7.92 Lakh", "Storytelling"],
    ["Kenny Sebastian", "https://wikibio.in/wp-content/uploads/2019/10/Kenny-Sebastian.jpg", "22.4 Lakh", "Musical Comedy"],
    ["Vir Das", "https://m.media-amazon.com/images/M/MV5BMTU5ODc4NzMwMF5BMl5BanBnXkFtZTgwOTA3NzE0OTE@.jpg", "9.11 Lakh", "Political Comedy"],
    ["Atul Khatri", "https://www.celebsages.com/wp-content/uploads/age/khatri-atul-image.jpg", "3.96 Lakh", "Corporate Comedy"],
    ["Rahul Subramanian", "https://m.media-amazon.com/images/M/MV5BMzJlNmI0Y2YtMjk3OS00ZWIyLWI0YjctYzUyNThjZDFjYzg3XkEyXkFqcGdeQXVyNDAzNDk0MTQ@.jpg", "7.32 Lakh", "Sarcasm"],
    ["Sumukhi Suresh", "https://m.media-amazon.com/images/M/MV5BZWI5OWIyNDItZDVhNi00MDcwLTliZWEtMjVjNWYzMmVjMGUyXkEyXkFqcGdeQXVyNjYxMTgzMzQ@.jpg", "1.04 Lakh", "Character Comedy"],
    ["Abish Mathew", "https://m.media-amazon.com/images/M/MV5BMjFhMGZhZmQtZDEyYy00MzI3LTlhMDEtNTU3M2YxYjMzNjk2XkEyXkFqcGdeQXVyNjYxMTgzMzQ@.jpg", "11 Lakh", "Sketch Comedy"],
    ["Varun Thakur", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/varun-thakur-27948-16-06-2021-02-15-06.jpg", "3.44 Lakh", "Impression Comedy"],
    ["Neeti Palta", "https://m.media-amazon.com/images/M/MV5BMzA1NDQ5MmQtNTMxZC00ODNiLWIyMjUtZmRiYzVlYjM5NzJjXkEyXkFqcGdeQXVyOTg3NTQwMTU@.jpg", "2.03 Lakh", "Feminist Comedy"],
    ["Anuvab Pal", "https://m.media-amazon.com/images/M/MV5BYTNjZjVlYTEtNTcxYS00NjQ2LWI4ODQtZjMxYTQ1ZjJiZDhiXkEyXkFqcGdeQXVyOTg3NTQwMTU@.jpg", "25.4 K", "Political Satire"],
    ["Sorabh Pant", "https://m.media-amazon.com/images/M/MV5BYTFkYWU0NTUtYjczMC00MjkxLWFkODctZTEyYTRkMjIwYWM4XkEyXkFqcGdeQXVyNzIyNDY3MDk@.jpg", "3.59 Lakh", "Cultural Commentary"],
    ["Aditi Mittal", "https://i.pinimg.com/originals/96/83/2e/96832e50d092510af13a964511219266.jpg", "2.36 Lakh", "Feminist Comedy"],
    ["Munawar Faruqui", "https://api.time.com/wp-content/uploads/2021/02/muawar-faruqui-comedian.jpg?quality=85&w=2400", "50.3 Lakh", "Controversial Comedy"],
    ["Harsh Gujral", "https://ytstarbio.com/wp-content/uploads/2022/12/download-4.jpg", "21 Lakh", "Witty Humor"],
    ["Aubhav Singh Bassi", "https://wikibio.in/wp-content/uploads/2020/08/Anubhav-Singh-Bassi.jpg", "50 Lakh", "Storytelling"],
    ["Abhisekh Upmanu", "https://m.media-amazon.com/images/M/MV5BNzc1NzZiYzQtMmU0NC00OWM3LTk2NGMtNWU1ZjQ0YmNjNWJkXkEyXkFqcGdeQXVyNjA0MjY2MjM@.jpg", "51.3 Lakh", "Satire"],
    ["Gaurav Kapoor", "https://m.media-amazon.com/images/M/MV5BNzdjODQ3NWYtODM3NS00OTA2LWFmYjktYWExMDU1YmU5MWY3XkEyXkFqcGdeQXVyOTg3NTQwMTU@.jpg", "13.4 Lakh", "Observational Comedy"],
    ["Samay Raina", "https://m.media-amazon.com/images/M/MV5BMTMyZjcwZDItNGQ5MC00ZjJjLWIyOWEtOTRhOTI5Yzg4ZGU2XkEyXkFqcGdeQXVyOTg3NTQwMTU@.jpg", "13.6 Lakh", "Gaming Comedy"]
]

genre_list = []
artist_name = []

print('Enter your 5 favourite artists:')
for i in range(5):
    artist = input()
    artist_name.append(artist)

def get_audio_genre(artist_name):
    query = f"artist:{artist_name}"
    results = sp.search(q=query, type='artist', limit=10, offset=0)
    items = results['artists']['items']
    if items:
        genres = items[0]['genres']
        return genres
    else:
        return []  

for i in range(5):
    genres = get_audio_genre(artist_name[i])
    genre_list.extend(genres) if genres else None  

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

print("Your Top 10 Genres:")
print(top_10_genres)

def get_random_artist_by_genre(genre):
    results = sp.search(q=f"genre:{genre}", type='artist', limit=10)
    artists = results['artists']['items']
    
    if not artists:
        return None
    else:
        random_artist = random.choice(artists)
        return random_artist['name']

all_artists = [] 

for genre in top_10_genres:
    random_artist = get_random_artist_by_genre(genre)
    if random_artist:  # Check if random artist is found for the genre
        all_artists.append(random_artist)  # Add random artist to the combined list
remaining_artist = max(5 - len(all_artists), 0)
random_comedians = random.sample(comedians, min(3, len(comedians)))  # Pick a maximum of 3 comedians

random_ted_talkers = random.sample(ted_talkers, min(2, len(ted_talkers)))  # Pick a maximum of 2 TED talkers

all_artists.extend(comedian[0] for comedian in random_comedians)
all_artists.extend(ted_talker[0] for ted_talker in random_ted_talkers)

remaining_artists_needed = 5 - len(all_artists)
if remaining_artists_needed > 0:
    remaining_comedians = random.sample(comedians, min(remaining_artists_needed, len(comedians)))
    remaining_artists_needed -= len(remaining_comedians)
    
    remaining_ted_talkers = random.sample(ted_talkers, min(remaining_artists_needed, len(ted_talkers)))
    remaining_artists_needed -= len(remaining_ted_talkers)
    
    all_artists.extend(comedian[0] for comedian in remaining_comedians)
    all_artists.extend(ted_talker[0] for ted_talker in remaining_ted_talkers)

random.shuffle(all_artists)

print("\nCombined List of Recommended Picked Artists:")
for artist in all_artists:
    print(artist)