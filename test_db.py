import asyncio
import asyncpg

async def test_connection():
    try:
        # Note: The @ symbol in the password needs to be URL encoded as %40
        conn = await asyncpg.connect('postgresql://postgres:Cadbury%40123@localhost:5432/medi_chain_db')
        print('Connected successfully')
        await conn.close()
    except Exception as e:
        print(f'Connection failed: {e}')

if __name__ == '__main__':
    asyncio.run(test_connection())