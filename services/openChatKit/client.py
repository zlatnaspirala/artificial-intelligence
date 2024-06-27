import asyncio
import websockets

async def wsrun(uri):
    async with websockets.connect(uri) as websocket:
        await websocket.send('hey')
        # while websocket.recv():
        print(await websocket.recv()) # Starts receive things, not only once

asyncio.get_event_loop().run_until_complete(wsrun('ws://localhost:8000'))

# async def test():
#     async with websockets.connect('ws://localhost:8000') as websocket:
#         await websocket.send("hello")
#         while True:
#             response = await websocket.recv()
#             print(response)

# asyncio.get_event_loop().run_until_complete(test())

asyncio.get_event_loop().run_forever()