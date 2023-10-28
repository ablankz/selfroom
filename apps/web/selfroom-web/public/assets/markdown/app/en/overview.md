### Application Overview

---

#### Intent of Creation

- I decided to create a basic chat application when I thought I could use my usual activities on the back-end side for my portfolio.

#### Technology Used

- `laravel`
  - Use laravel for the backend
  - The directory structure is somewhat rearranged to be unique.
- `react`(vite)
  - Frontend uses react
  - This time, nextJs is not used, and the build tool for react alone is developed using the fast vite instead of webpack.
- `docker`
  - Use docker at least during the development phase
  - Production environment will also use AWS ECS for the first time
- `AWS`
  - In addition to ecs, we plan to use various other services from aws
  - However, managed services are discussed with the cost
- `Pusher`
  - webSocket for chat is using pusher service.
- `postgresql`
  - Postgres is used as the RDB this time (I have never touched any other RDB except mysql).
- `redis`
  - Use redis for key-value type db
- `cron`
  - Batch processing is registered in cron for automatic execution. 

#### API Access Specifications

- Originally created to be able to hit the API directly
- postman and swaggerUI are sufficient, but they are often used from everyday development because definitions can be written in a simplified manner
- Body data only accepts simple string data because it has not yet been made to support file data or complex objects.

#### Authentication Specifications

- Use jwt
- Authentication can be seen in the following order of tokens
> Authorization Header (Bearer)\
> -> Request query (‘token’)\
> -> Request body (‘token’)\
> -> Route Parameters(token)\
> ->Cookie (token)
- The application itself uses cookies, so there is no need for handling on the front side
- Be aware of that in the `Raw Api` section (if it's in the header, it will take precedence).
- Account registration should be simple and not use an email address.
- No email verification, so do not create features such as password resets, etc., but treat them as a minimum to retain users.

#### Specifications for chat applications

- Simple chat application
- Only authenticated users can enter chat rooms.
- Create a room at will and allow users to enter that room by searching for that room.
- Rooms can also be created with passwords to allow only limited users to enter.
- Even if a user created a room, the room has no owner, and no user has the authority to delete or rename the room.
- This is for chat purposes only and is not intended for the exchange of complex resources such as sending photos, etc.
- Users can only enter one room at a time.
- Room chat history can be viewed even by users who enter the room later.
- Talks are automatically deleted after a week.
- When a room is deleted, the talk history for that room becomes unavailable for viewing.
- After a month of no one in the room, the room is automatically deleted.
- Even if the above is not the case, the room will be automatically deleted 3 months after the last user statement.

#### About API Design Document

- This API is not a public API, but it is a simple application, so almost all endpoints are exposed
- SwaggerUi accessible from `openapi.selfroom.net`

<br>

### Reference

---

- [Minimal - Client and Admin Dashboard](https://minimals.cc/)
  - I am not very good at front-end development (I like the logic, but not the design...). Therefore, when I do personal web development, I usually purchase templates and create applications based on them.
  - The design itself is again based on [mui template](https://mui.com/store/items/minimal-dashboard/)
  - I code the content (other than the framework) and logic of each section myself.


