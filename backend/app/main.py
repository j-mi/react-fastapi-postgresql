from fastapi import FastAPI, Request, Response
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from dbHandler import getUrls, removeUrlByShortUrl, getLongUrlByShortUrl, makeNewTable, updateUrlClickedByShortUrl, updateUrlClickDate, recreate_db
from shortener import hasher
import uvicorn

app = FastAPI()

#makes new postgres table, skips if already exists 
#makeNewTable()

#recreates tables
#recreate_db()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/{shortUrl}", response_class=Response)
async def get_URL(shortUrl:str, request:Request):
    longUrl = getLongUrlByShortUrl(shortUrl)
    if longUrl is None:
        return JSONResponse(status_code=404)
    else:
        updateUrlClickedByShortUrl(shortUrl)
        updateUrlClickDate(shortUrl)
        response = RedirectResponse(longUrl.toDict()['longUrl'])
        return response

@app.put("/snipUrl")
async def get_URL(request:Request):
    longUrl = await request.json()
    return JSONResponse(status_code=201, content={"urlShortAddress": request.client.host + "/" + hasher(longUrl['longUrl']), "longUrl": longUrl['longUrl'] })

@app.get("/stats/all")
async def get_stats(request:Request):
    urlsToReturn = []
    for u in getUrls():
        urlsToReturn.append(u.toDict())
    return JSONResponse(content={"hostAddress":request.client.host, "urlsToReturn":urlsToReturn})

@app.put("/clicked/{shortURL}")
async def update_URL_click(shortURL:str):
    if updateUrlClickedByShortUrl(shortURL):
        return {"message": True}
    else:
        return {"message": False}

@app.delete("/removeUrl/{shortURL}")
async def remove_URL(shortURL:str, request:Request):
    if removeUrlByShortUrl(shortURL):
        urlsToReturn = []
        for u in getUrls():
            urlsToReturn.append(u.toDict())
        return JSONResponse(content={"hostAddress":request.client.host, "urlsToReturn":urlsToReturn})
    else:
        return {"message": False}

@app.put("/urlClickedDate/{shortURL}")
async def update_urlClicked_Date(shortURL:str):
    updateUrlClickDate(shortURL)
    return {"message": True}
   
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)