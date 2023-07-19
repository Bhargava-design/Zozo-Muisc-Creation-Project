from azure.storage.blob import BlobServiceClient

# Replace these with your Azure Storage Account credentials
connection_string = "DefaultEndpointsProtocol=https;AccountName=musicsblock;AccountKey=jAQWo4ZwwDfbaALlbGWKoHVWmG1pPkMiefyQBLUO7BKBDvzJ4jWDRU3+S0Kf1900q4v7kI/Vph6f+AStcD+WVw==;EndpointSuffix=core.windows.net"
container_name = "englishmusic"

def list_files_in_container():
    # Connect to the Azure Storage Account
    blob_service_client = BlobServiceClient.from_connection_string(connection_string)

    # Get the container
    container_client = blob_service_client.get_container_client(container_name)

    # List the blobs in the container
    blobs = container_client.list_blobs()

    # Create a list to store the blob names
    blob_list = [blob.name for blob in blobs]

    return blob_list

if __name__ == "__main__":
    file_list = list_files_in_container()

    # Generate a markdown file with the list of files
    with open("azure_storage_content.md", "w") as f:
        f.write("# Azure Storage Account Content\n\n")
        for file_name in file_list:
            f.write(f"- {file_name}\n")
