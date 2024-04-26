# Backend

## Run locally

### Create / Run postgres docker container

**Create:**
```bash
docker run --name qa-forum-db -p 5432:5432 -e POSTGRES_DB=qa-forum -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -d postgres:16.2
```

**Run (if container already exists):**
```bash
docker start qa-forum-db
```

### Connection-String to Database
```
postgres://admin:admin@localhost:5432/qa-forum
```

### Set .env variables
Copy the .env.example file in the root layer of the backend folder and rename it to .env


### Start up backend server
```bash
npm run start-dev
```