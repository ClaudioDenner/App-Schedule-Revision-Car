<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="25" alt="Nest Logo" /></a>
</p>
<p align="center">
Application build in Nest.js.
</p>


```mermaid
graph LR

A((Backend Nest.js))--
-- TypeORM -->
B{DB:PostgreSQL}

```


## Read before to run

<p style="color:red">
The application need to a database(postgres). With no database, the app dont' start.
</p>
<p style="color:red">
As soon as the application running, he will create the tables necessary for running the application.
</p>

<p>
Make sure that exists the file ".env" in root. Case no, create its and set:
</p>

```bash
DB_HOST = 'localhost'
DB_PORT = 5432
DB_USER_NAME = 'admin'
DB_PASS = 'admin'
DB_NAME = 'scheduleCar'
# modify infos according your database.
```

## Running the app with Docker

```bash
# for create the image
$ docker build -t backend .

# for run a container from the image
$ docker run --name container-backend backend

```

## Running the app With No Docker

```bash
# for install all dependencies
$ npm install

# for running application
$ npm run start
```

## Instructions about Route's API

>With App running, access in browser http://localhost:3000/ for get documentation swagger about routes.



## More

> Author - [Claudio Denner](https://cdenner.com.br/)

