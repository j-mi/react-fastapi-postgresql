import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Url
from database import DATABASE_URI

engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)

#creates the table
#Base.metadata.create_all(engine)
session = Session()

def makeNewTable():
    #if there is already table, it won't recreate it
    Base.metadata.create_all(engine, checkfirst=True)

def recreate_db():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

def getUrls():
    urls = session.query(Url).all()
    session.close()
    for u in urls:
        u.__dict__.pop('_sa_instance_state')
    return urls

def getUrlssss():
    urls = session.query(Url).all()
    session.close()
    for u in urls:
        u.__dict__.pop('_sa_instance_state')
    return urls  


def updateUrlClickDate(shortUrl):
    clickDates=[]
    try:
        urlData = session.query(Url).filter(Url.shortUrl == shortUrl).first()
        if urlData.toDict()['clickDates']:
            for datesOfClick in urlData.clickDates:
                clickDates.append(datesOfClick)
        clickDates.append(datetime.datetime.now())
        session.query(Url).filter(Url.shortUrl == shortUrl).update({"clickDates": clickDates})
        session.commit()
        session.close()
        return True
    except Exception:
        session.rollback()
        session.close()
        return False


def addUrl(long, short, click=0, save=datetime.datetime.now()):
    url = Url(longUrl=long, shortUrl=short, clicked=click, saved=save, clickDates=[None])
    urlId = None
    try:
        session.add(url)
        session.commit()
    except Exception:
        session.rollback()
        session.close()
        return False, None
    urlId = url.id
    session.close()
    return True, urlId
    
def removeUrlByShortUrl(shortUrl):
    try:
        session.query(Url).filter(Url.shortUrl == shortUrl).delete()
        session.commit()
        session.close()
    except Exception:
        session.rollback()
        session.close()
        return False
    return True

def updateUrlClickedByShortUrl(shortUrl):
    try:
        session.query(Url).filter(Url.shortUrl == shortUrl).update({"clicked": (Url.clicked +1)})
        session.commit()
        session.close()
    except Exception:
        session.rollback()
        session.close()
        return False
    return True

def updateShortUrlById(urlId, shortUrl):
    try:
        session.query(Url).filter(Url.id == urlId).update({"shortUrl": shortUrl})
        session.commit()
        session.close()
    except Exception:
        session.rollback()
        session.close()
        return False
    return True

def getLongUrlByShortUrl(shortUrl):
    longUrl = None
    try:
        longUrl = session.query(Url).filter(Url.shortUrl == shortUrl).first()
        session.close()
    except Exception:
        session.rollback()
        session.close()
    return longUrl
