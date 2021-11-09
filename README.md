# react-fastapi-postgresql
simple full stack app

# fullStack

PostgreSQL + python fastAPI + react


### backend, fastAPI

start python3 virtual environment: 
`./backend/app/python3 -m venv venv`
`source ./venv/bin/activate`

and install required libraries:
`python3 -m pip install -r requirements.txt`

freeze pips (if new pips are installed)
`pip freeze > requirements.txt`

deactivate python virtual environment:
`deactivate`

start fastAPI backend:
`./backend/app/python3 api.py`

### frontend, react

`./frontend/urlsnipper/npm install`
`./frontend/urlsnipper/npm start`

### database, PostgreSQL and docker

tested with PostgreSQL 14.0
PostgreSQL config can be found from .env -file

### docker

if Ubuntu, you might need to check Postgres IP address with:
`docker inspect postgres -f "{{json .NetworkSettings.Networks }}"`

and update database IP address to `./backend/app/.env` 

run postgres docker container with:

`./db/docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postges`

or using docker-compose

`./db/docker-compose up`





