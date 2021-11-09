import os
from dotenv import load_dotenv

load_dotenv()

password = os.getenv('POSTGRES_PASSWORD')
dockerDBIP = os.getenv('DOCKER_POSTGRES_IP')
dbName = os.getenv('POSTGRES_DB')
postgres_port = os.getenv('POSTGRES_PORT')

DATABASE_URI = 'postgresql://postgres:' + password + '@' + dockerDBIP + ':' + postgres_port + '/' + dbName

