const express = require('express');
const bodyParser = require('body-parser');

//route handlers
const classRoutes = require('./routes/classRoutes');
const collegeRoutes = require('./routes/collegeRoutes');
const professorRoutes = require('./routes/professorRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teamRoutes = require('./routes/teamRoutes');
const usersRoutes = require('./routes/userStoryRoutes');

//middle ware
// const { createModelsMiddleware } = require('./middleware/model-middleware');
// const { authenticateJWT} = require('./middleware/auth.js');

//define express app instance
const app = express();
const port = 8000;

//start middleware chain
const { createModelsMiddleware } = require('./middleware/model-middleware');

app.use(createModelsMiddleware);
app.use(bodyParser.json());

//health route
app.get('/health', (request, response, next) => {
    const responseBody = { status: 'up', port };
    response.json(responseBody);

    next();
});

app.use('/class', classRoutes);
app.use('/college', collegeRoutes);
app.use('/professor', professorRoutes);
app.use('/recruiter', recruiterRoutes);
app.use('/student', studentRoutes);
app.use('/team', teamRoutes);
app.use('/users', usersRoutes);

//listen for incoming requests
app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
});
