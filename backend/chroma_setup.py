import chromadb

def get_chroma_client():
    # Initialize ChromaDB client
    client = chromadb.PersistentClient(path="./chroma_db")
    return client

def create_fitness_collection(client):
    # Create or get collection for fitness data
    collection = client.get_or_create_collection(name="fitness_data")
    return collection

if __name__ == "__main__":
    client = get_chroma_client()
    collection = create_fitness_collection(client)
    print("ChromaDB setup complete.")
