# Todo Application

A simple, modern todo application built with Node.js, Express.js, and vanilla JavaScript. This application is designed to be easily deployable on AWS.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Backend REST API
- **HTML/CSS/JavaScript** - Frontend (vanilla JS)
- **JSON File Storage** - Simple data persistence

## Features

- ✅ Add, edit, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Filter todos (All, Active, Completed)
- ✅ Modern, responsive UI
- ✅ RESTful API backend
- ✅ Simple JSON file storage

## Project Structure

```
todooo/
├── server.js          # Express.js backend server
├── package.json       # Node.js dependencies
├── public/            # Frontend files
│   ├── index.html    # Main HTML file
│   ├── styles.css    # CSS styling
│   └── app.js        # Frontend JavaScript
├── data/              # Data storage (created automatically)
│   └── todos.json    # Todo data file
└── README.md         # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
node server.js
```

3. Open your browser and navigate to:
```
deployed on ec2 instance of aws
http://13.221.208.243:3000/
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
  - Body: `{ "text": "Todo text", "completed": false }`
- `PUT /api/todos/:id` - Update a todo
  - Body: `{ "text": "Updated text" }` or `{ "completed": true }`
- `DELETE /api/todos/:id` - Delete a todo

## AWS Deployment

This application can be easily deployed on AWS using EC2:


### Option 2: AWS EC2

1. **Launch an EC2 instance** (Ubuntu recommended)
2. **SSH into your instance:**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Clone and setup your app:**
```bash
git clone your-repo-url
cd todooo
npm install
```
6. **Start the app with
   node server.js

8. **Configure security group** to allow HTTP (port 3000) or use Nginx as reverse proxy

## Environment Variables

The app uses the following environment variables:

- `PORT` - Server port (default: 3000)

You can set it in your deployment environment.


## License

ISC
