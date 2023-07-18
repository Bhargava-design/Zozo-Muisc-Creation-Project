from flask import Flask, render_template
from azure.storage.blob import BlobServiceClient


app = Flask(__name__)
# Define your storage account connection string
connection_string = 'DefaultEndpointsProtocol=https;AccountName=musicsblock;AccountKey=jAQWo4ZwwDfbaALlbGWKoHVWmG1pPkMiefyQBLUO7BKBDvzJ4jWDRU3+S0Kf1900q4v7kI/Vph6f+AStcD+WVw==;EndpointSuffix=core.windows.net'

# Create a BlobServiceClient object
blob_service_client = BlobServiceClient.from_connection_string(connection_string)

# Define the container name where your music files are stored
container_name = 'englishmusic'

@app.route('/')
def display_music_playlist():
    try:
        # Get the container client
        container_client = blob_service_client.get_container_client(container_name)

        # List all blobs (music files) in the container
        blob_list = container_client.list_blobs()
        music_files = []
        # Loop through the blob list
        for blob in blob_list:
            # Print the name of the music file
            #print(f"Music File: {blob.name}")

        # Get the URL of the music file
            url = f"https://{blob_service_client.account_name}.blob.core.windows.net/{container_name}/{blob.name}"
            music_files.append(url)
            # Use the URL to display or play the music file on your website
            #link_html = f'<a href="{url}" target="_blank">{blob.name}</a>'
            #music_files_html += link_html + "<br>"
            # You can customize this part to fit your website's requirements
        #print(f"URL: {url}")
        return render_template('playlist.html', music_files=music_files)
    
    except Exception as e:
        # Handle exceptions
        print(f"Error retrieving music files: {str(e)}")
if __name__ == '__main__':
    app.run(debug=True)