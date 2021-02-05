
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);

app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'BhhLJ6qlkA0CwORikQ8dIZWy',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


app.use(express.static(path.resolve(__dirname, public)));
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


if (process.env.NODE_ENV === 'development') {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

const templatesRoutes = require('./api/templates/templates.routes')
app.use('/api/templates', templatesRoutes)

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});

