require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
// const cors = require('cors');
userCtrl = require('./controllers/user');
postCtrl = require('./controllers/posts');


const app = express()
// const SERVER_PORT = 4040
const { SERVER_PORT, CONNECTION_STRING } = process.env


app.use(express.json());
// app.use(cors())
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'daisies',
    cookie: { maxAge: 60000 },
  })
)


//Auth Endpoints
// app.post('/api/auth/register', userCtrl.register);
// app.post('/api/auth/login', userCtrl.login);
// app.get('/api/auth/me', userCtrl.getUser);
// app.post('/api/auth/logout', userCtrl.logout);

// //Post Endpoints
// app.get('/api/posts', postCtrl.readPosts);
// app.post('/api/post', postCtrl.createPost);
// app.get('/api/post/:id', postCtrl.readPost);
// app.delete('/api/post/:id', postCtrl.deletePost)

app.listen(SERVER_PORT, () => console.log(`HECK yes, we're running on ${SERVER_PORT}`));


massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then((dbInstance) => {
  app.set('db', dbInstance);
});