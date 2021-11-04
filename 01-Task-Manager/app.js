// REST API
// GET:       app.get('/api/v1/tasks)       - get all the tasks
// POST:      app.post('/api/v1/tasks)      - create a new task
// GET:       app.get('/api/v1/tasks/:id)   - get single task
// PUT/PATCH: app.patch('/api/v1/tasks/:id) - update task
// DELETE:    app.delet('/api/v1/tasks/:id) - delete task

// CRUD => Create Read Update Destroy

// Our work to do
// app.get('/api/v1/tasks)       - get all the tasks
// app.post('/api/v1/tasks)      - create a new task
// app.get('/api/v1/tasks/:id)   - get single task
// app.patch('/api/v1/tasks/:id) - update task
// app.delet('/api/v1/tasks/:id) - delete task

/////////////////////////////////////////////////////////////

const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
// acces to the database
const connectDB = require('./db/connect');
// acces to env vars
require('dotenv').config();

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

// test database
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
