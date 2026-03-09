const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
require('./configs/db')
const cookieParser = require('cookie-parser');
// const checkAuth = require('../src/router/CheckRouter')
const AuthRoutes = require('./router/AuthRoutes')
const PasswordRoutes = require('./router/PasswordRoutes')
const UserRoutes = require('./router/UserRoutes')
const UnlockVaultRoute = require('./router/UnlockVaultRoutes')
const globalErrorHandler = require('./middlewares/error.middleware')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(cookieParser());
app.use(express.json());

// Add this health check route
app.get('/check/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is healthy!',
        timestamp: new Date().toISOString()
    });
});


app.use('/api/auth', AuthRoutes)
app.use('/api/password', PasswordRoutes)
app.use('/api/user', UserRoutes)
app.use('/api/unlock', UnlockVaultRoute)

// app.use('check', checkAuth)

app.use(globalErrorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})