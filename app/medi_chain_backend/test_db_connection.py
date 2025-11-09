import asyncio
from src.db.main import async_engine

async def test_connection():
    print("Testing database connection...")
    try:
        async with async_engine.connect() as conn:
            print("Connected successfully to the database!")
            print("Database connection test completed successfully!")
    except Exception as e:
        print(f"Failed to connect to database: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_connection())