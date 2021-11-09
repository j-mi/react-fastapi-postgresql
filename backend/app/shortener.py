from hashids import Hashids
from dotenv import load_dotenv
from dbHandler import addUrl, updateShortUrlById
import os

load_dotenv()

def hasher(longUrl):
    dbAddOk, urlId = addUrl(longUrl, "")
    if dbAddOk:
        secret = os.getenv('SALT_SECRET')
        hashids = Hashids(min_length=4, salt=secret)
        hashedUrl = hashids.encode(urlId)
        updateShortUrlById(urlId, hashedUrl)
        return hashedUrl
    else:
        return False