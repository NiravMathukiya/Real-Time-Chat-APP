
# Real-Time-Chat-App

``` A Real-Time Chat App```  built with React.js, Node.js, Express, and MongoDB enables seamless communication between users. The app uses Socket.io to provide instant message updates without the need for page refreshes. The frontend, developed with React.js, offers a responsive and interactive UI, while the backend, powered by Node.js and Express, handles user authentication, message storage, and API endpoints. MongoDB stores user data and chat history efficiently. Socket.io ensures real-time bidirectional communication, allowing users to send and receive messages instantly. This tech stack creates a scalable and efficient real-time chat experience. 🚀


### Features
- ✅ User authentication (Signup, Login, Logout)
- ✅ Real-time messaging with Socket.io
- ✅ Secure API with JWT authentication
- ✅ MongoDB for storing users & messages
# Hi, I'm Nirav Mathukiya! 👋

I'm Nirav Mathukiya a full-stack developer passionate about building web applications with React.js, Node.js, Express, and MongoDB. Currently, I'm working on a real-time chat app using Socket.io for seamless communication. 🚀

🔹 Tech Stack: React.js | Node.js | Express | MongoDB | Socket.io
🔹 Interests: Web Development, APIs, Real-Time Applications
🔹 Currently Learning: Advanced React Patterns & WebSockets

💡 Always exploring new technologies and working on exciting projects! Let's connect and collaborate.

📫 Reach me at: https://www.linkedin.com/in/nirav-mathukiya007


## 🛠 Skills

- HTML 
- CSS
- Javscript
- React
- Tailwind
- Node.js
- Express
- MongoDB


# Installation (Run Locally)

## installation Frontend
- also config all .env variables

Install Frontend with npm

```bash 
  cd Frontend

  npm install 
```
Run the Devlopment Server

```bash
 npm run dev
```

## installation Backend

- also config all .env variables

Install Backend with npm

```bash 
  cd Backend

  npm install 
```
Run the Devlopment Server

```bash
 npm start
```


# API Reference

## Auth Routes

#### Register Api

```http
  POST /api/auth/signup
```

| Parameter | Type     |   Required |  Description             |
| :-------- | :------- | :--------------|----------- |
| `name` | `string` | **Yes** |User’s name |
| `email` | `string` | **Yes** |User’s emai |
| `Password` | `string` | **Yes** | User’s password |

#### Login Api

```http
 POST /api/auth/login
```

| Parameter | Type     |   Required |  Description             |
| :-------- | :------- | :--------------|----------- |
| `email` | `string` | **Yes** |User’s email |
| `Password` | `string` | **Yes** | User’s password |

#### Logout

``` http
POST /api/auth/logout
```
#### Update Profile

``` http
PUT /api/auth/update-profile
```
| Parameter | Type     |   Required |  Description             |
| :-------- | :------- | :--------------|----------- |
| `name` | `string` | **Yes** |User’s name |
| `email` | `string` | **Yes** |User’s emai |

#### Check Authenticated User

``` http
GET /api/auth/check
```
| key | Value     |   
| :-------- | :------- |
| `Authorization` | `Bearer` token | 


## Message Routes

#### Get Sidebar Users

``` http
GET /api/messages/users
```
| key | Value     |   
| :-------- | :------- |
| `Authorization` | `Bearer` token | 


#### Get Messages

``` http
GET GET /api/messages/:id

```
| key | Value     |   
| :-------- | :------- |
| `Authorization` | `Bearer` token | 

| Parameter | Type     |   Required |  Description             |
| :-------- | :------- | :--------------|----------- |
| `id` | `string` | **Yes** |Recipient user ID |

#### Send Messages

``` http
POST /api/messages/send/:id

```
| key | Value     |   
| :-------- | :------- |
| `Authorization` | `Bearer` token | 

| Parameter | Type     |   Required |  Description             |
| :-------- | :------- | :--------------|----------- |
| `id` | `string` | **Yes** |Recipient user ID |
| `id` | `string` | **Yes** |Message content |


## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nirav-mathukiya007/)

[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=X&logoColor=white)](https://x.com/developer_io_)

[![Github](https://img.shields.io/badge/Github-1DA1F2?style=for-the-badge&logo=github&logoColor=black)](https://github.com/NiravMathukiya)


