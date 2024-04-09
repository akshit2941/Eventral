import random

comedians = [
    {"name": "Zakir Khan", "profile_url": "https://hamariweb.com/profiles/images/profile/1812-166-10043.jpg"},
    {"name": "Biswa Kalyan Rath", "profile_url": "https://m.media-amazon.com/images/S/pv-target-images/c122c33c7abb41c06f4dcb0dca5410ac0d968ec6d4546060dd4493b2eb39ec0d.jpg"},
    {"name": "Kanan Gill", "profile_url": "https://m.media-amazon.com/images/M/MV5BMGRmYmEzODYtY2VjMi00ZDEyLWJkZDEtZTc0OWUyMDhkOWJiXkEyXkFqcGdeQXVyOTAyMDgxODQ@.jpg"},
    {"name": "Kenny Sebastian", "profile_url": "https://wikibio.in/wp-content/uploads/2019/10/Kenny-Sebastian.jpg"},
    {"name": "Vir Das", "profile_url": "https://m.media-amazon.com/images/M/MV5BMTU5ODc4NzMwMF5BMl5BanBnXkFtZTgwOTA3NzE0OTE@.jpg"},
    {"name": "Atul Khatri", "profile_url": "https://www.celebsages.com/wp-content/uploads/age/khatri-atul-image.jpg"},
    {"name": "Rahul Subramanian", "profile_url": "https://m.media-amazon.com/images/M/MV5BMzJlNmI0Y2YtMjk3OS00ZWIyLWI0YjctYzUyNThjZDFjYzg3XkEyXkFqcGdeQXVyNDAzNDk0MTQ@.jpg"},
    {"name": "Sumukhi Suresh", "profile_url": "https://m.media-amazon.com/images/M/MV5BZWI5OWIyNDItZDVhNi00MDcwLTliZWEtMjVjNWYzMmVjMGUyXkEyXkFqcGdeQXVyNjYxMTgzMzQ@.jpg"},
    {"name": "Abish Mathew", "profile_url": "https://m.media-amazon.com/images/M/MV5BMjFhMGZhZmQtZDEyYy00MzI3LTlhMDEtNTU3M2YxYjMzNjk2XkEyXkFqcGdeQXVyNjYxMTgzMzQ@.jpg"},
    {"name": "Varun Thakur", "profile_url": "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/varun-thakur-27948-16-06-2021-02-15-06.jpg"},
    {"name": "Neeti Palta", "profile_url": "https://m.media-amazon.com/images/M/MV5BMzA1NDQ5MmQtNTMxZC00ODNiLWIyMjUtZmRiYzVlYjM5NzJjXkEyXkFqcGdeQXVyOTg3NTQwMTU@.jpg"},
    {"name": "Anuvab Pal", "profile_url": "https://m.media-amazon.com/images/M/MV5BYTNjZjVlYTEtNTcxYS00NjQ2LWI4ODQtZjMxYTQ1ZjJiZDhiXkEyXkFqcGdeQXVyOTg3NTQwMTU@.jpg"},
    {"name": "Sorabh Pant", "profile_url": "https://m.media-amazon.com/images/M/MV5BYTFkYWU0NTUtYjczMC00MjkxLWFkODctZTEyYTRkMjIwYWM4XkEyXkFqcGdeQXVyNzIyNDY3MDk@.jpg"},
    {"name": "Aditi Mittal", "profile_url": "https://i.pinimg.com/originals/96/83/2e/96832e50d092510af13a964511219266.jpg"},
    {"name": "Munawar Faruqui", "profile_url": "https://api.time.com/wp-content/uploads/2021/02/muawar-faruqui-comedian.jpg?quality=85&w=2400"},
    {"name": "Harsh Gujral", "profile_url": "https://ytstarbio.com/wp-content/uploads/2022/12/download-4.jpg"},
    {"name": "Aubhav Singh Bassi", "profile_url": "https://wikibio.in/wp-content/uploads/2020/08/Anubhav-Singh-Bassi.jpg"},
    {"name": "Abhisekh Upmanu", "profile_url": "https://m.media-amazon.com/images/M/MV5BNzc1NzZiYzQtMmU0NC00OWM3LTk2NGMtNWU1ZjQ0YmNjNWJkXkEyXkFqcGdeQXVyNjA0MjY2MjM@.jpg"},
    {"name": "Gaurav Kapoor", "profile_url": "https://m.media-amazon.com/images/M/MV5BNzdjODQ3NWYtODM3NS00OTA2LWFmYjktYWExMDU1YmU5MWY3XkEyXkFqcGdeQXVyOTg3NTQwMTU@.jpg"},
    {"name": "Samay Raina", "profile_url": "https://m.media-amazon.com/images/M/MV5BMTMyZjcwZDItNGQ5MC00ZjJjLWIyOWEtOTRhOTI5Yzg4ZGU2XkEyXkFqcGdeQXVyOTg3NTQwMTU@.jpg"}
]


random_comedians = random.sample(comedians, 5)

print("Randomly selected comedians:")
for comedian in random_comedians:
    print("Name:", comedian["name"])
    print("Profile URL:", comedian["profile_url"])
    print()