import random

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

# Select 5 random TED Talk speakers
random_ted_talkers = random.sample(ted_talkers, 5)

# Print the details of selected TED Talk speakers
for speaker in random_ted_talkers:
    print(f"Name: {speaker[0]}")
    print(f"Expertise: {speaker[1]}")
    print(f"PhotoUrl: {speaker[2]}")
    print()

# Extract the top 5 unique genres
genres = [speaker[1] for speaker in random_ted_talkers]
top5_genres = list(set(genres))[:5]

print(top5_genres)
