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
npm start
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

This application can be easily deployed on AWS using several methods:

### Option 1: AWS Elastic Beanstalk (Recommended for beginners)

1. **Install EB CLI:**
```bash
pip install awsebcli
```

2. **Initialize Elastic Beanstalk:**
```bash
eb init
```
   - Select your region
   - Choose Node.js platform
   - Select Node.js version

3. **Create and deploy:**
```bash
eb create todo-app
eb deploy
```

4. **Open your app:**
```bash
eb open
```

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

5. **Install PM2 (process manager):**
```bash
sudo npm install -g pm2
```

6. **Start the app with PM2:**
```bash
pm2 start server.js --name todo-app
pm2 save
pm2 startup
```

7. **Configure security group** to allow HTTP (port 3000) or use Nginx as reverse proxy

### Option 3: AWS Lambda + API Gateway + S3

For serverless deployment:

1. **Frontend (S3 + CloudFront):**
   - Upload `public/` folder to S3 bucket
   - Enable static website hosting
   - Optionally use CloudFront for CDN

2. **Backend (Lambda + API Gateway):**
   - Convert Express app to Lambda handler
   - Deploy using Serverless Framework or AWS SAM
   - Update API_URL in `app.js` to point to API Gateway endpoint

## Environment Variables

The app uses the following environment variables:

- `PORT` - Server port (default: 3000)

You can set it in your deployment environment.

## Database Migration (Optional)

Currently, the app uses a JSON file for storage. To migrate to AWS RDS (PostgreSQL/MySQL) or DynamoDB:

1. **For RDS:**
   - Install a database driver (e.g., `pg` for PostgreSQL)
   - Replace file operations in `server.js` with database queries
   - Update connection string in environment variables

2. **For DynamoDB:**
   - Install AWS SDK: `npm install aws-sdk`
   - Replace file operations with DynamoDB operations
   - Configure AWS credentials

## Security Considerations

- Add authentication/authorization for production
- Use HTTPS (configure SSL certificate)
- Add input validation and sanitization
- Implement rate limiting
- Use environment variables for sensitive data
- Enable CORS only for specific origins in production

## License

ISC
