### Details

A portfolio site completely developed by an individual. The production is the site itself, and we have created a simple chat application along with a self-introduction, productions, and biography. An overview of this application can be found [here](https://me.selfroom.net/overview).<br/>
This was the first time for me to complete a project as an individual developer, but I was able to create it while using some of the technologies I have been using in web development. Since this was the culmination of my work, I used Laravel for the back end and React for the front end, which I was most familiar with.<br/>
The actual code is available on [GitHub](https://github.com/ablankz/selfroom).<br/>

### Role

**Responsible for all**<br/>

Backend

- As explained above, we used Laravel and created an API server. Due to cost, we were not able to create email functions, etc., but we implemented minimal login and real-time chat functions.
- While incorporating many of the advantages of using Laravel, we also customized the directory structure in areas not covered by the framework.
- This project was created in about one month, starting with API design and database design (with the possibility of adding functionality in the future).
- You can check the API endpoints at [Swagger UI](https://openapi.selfroom.net) or [your own API access tool](https://me.selfroom.net/raw-api).

Frontend

- Code in React.
- Since I usually work with React developers on the front end, I only write logic for testing, so I adopted React, which I am familiar with.
- As for the design, we use the template from [Minimal - Client and Admin Dashboard](https://minimals.cc/).

Infrastructure

- As you can see from GitHub, we use Docker in the development phase.
- Since I want to deploy this as is, I will use AWS ECS (+Forgate).
- Although there are cost limitations, we would like to employ as many types of services as possible.

### Technology Used

Laravel

- Use laravel for the backend
- The directory structure is somewhat rearranged to be unique.

React(vite)

- Frontend uses react
- This time, nextJs is not used, and the build tool for react alone is developed using the fast vite instead of webpack.

Docker

- Use docker at least during the development phase
- Production environment will also use AWS ECS for the first time

AWS

- In addition to ecs, we plan to use various other services from aws
- However, managed services are discussed with the cost

Pusher

- webSocket for chat is using pusher service.

Postgresql

- Postgres is used as the RDB this time (I have never touched any other RDB except mysql).

Redis

- Use redis for key-value type db

Cron

- Batch processing is registered with cron for automatic execution

---

#### Links

- [Site Link](https://me.selfroom.net)
- [Swagger UI](https://openapi.selfroom.net)
- [GitHub](https://github.com/ablankz/selfroom)
