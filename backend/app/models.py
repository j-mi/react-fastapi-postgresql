from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, cast, Text, DateTime
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import ARRAY, array

Base = declarative_base()

class Url(Base):
    __tablename__ = 'urls'
    id = Column(Integer, primary_key=True)
    longUrl = Column(String)
    shortUrl = Column(String)
    clicked = Column(Integer)
    saved = Column(DateTime)
    #clickDates = Column(ARRAY(Date), default=cast(array([], type_=Date), ARRAY(Date)))
    clickDates = Column(ARRAY(DateTime))

    def __repr__(self):
        return "{'id':" + str(self.id) + ", 'longUrl':" + self.longUrl + ", 'shortUrl':" + self.shortUrl + ", 'clicked':" + str(self.clicked) + ", 'saved':" + self.saved.strftime('%d/%m/%Y') + "}"
  
    def toDict(self):
        datesOfClick = []
        if self.clickDates[0] is None:
            return {'id':self.id, 'longUrl':self.longUrl, 'shortUrl': self.shortUrl, 'clicked': self.clicked, 'saved': self.saved.strftime('%c'), 'clickDates':[] }
        else:
            for dateOfClick in self.clickDates:
                datesOfClick.append(dateOfClick.strftime('%c'))
            return {'id':self.id, 'longUrl':self.longUrl, 'shortUrl': self.shortUrl, 'clicked': self.clicked, 'saved': self.saved.strftime('%c'), 'clickDates':datesOfClick }