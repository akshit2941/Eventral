import random

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

random_comedians = random.sample(comedians, 5)
Top5Genre = []

print("Randomly selected comedians:")
for comedian in random_comedians:
    print("Name:", comedian[0])
    print("Profile URL:", comedian[1])
    print("Speciality:", comedian[3])
    Top5Genre.append(comedian[3])
    print()

print(Top5Genre)
