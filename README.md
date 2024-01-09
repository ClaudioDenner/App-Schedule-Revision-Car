# Welcome to App Schedule Revision Car FullStack!


```mermaid
graph LR
A[Frontend: NextJS]-->
B((Backend Nest.js))--
-- TypeORM -->
  C{DB:PostgreSQL}

```


# Running


```bash
$ docker-compose up
```

- Make sure to have the ports available: 80, 3000, 3002, 5432
- The project will only ready after to console inform frontend "ready in ...milliseconds".




