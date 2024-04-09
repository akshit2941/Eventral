from artist_stats import ArtistStats, followers_growth, profile_views, concerts, content_engagement

# Create an instance of ArtistStats
artist_stats = ArtistStats(followers_growth, profile_views, concerts, content_engagement)

# Calculate metrics
metrics = artist_stats.calculate_metrics()

# Export the metrics as a dictionary
exported_variables = {
    "metrics": metrics
}
