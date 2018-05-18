
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const
    app = require('express')();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES
const 
        authRoutes = require('./controllers/auth/auth'),
        prostorijeRoutes = require('./controllers/prostorije/prostorije');

const categoryRoutes = require('./controllers/categories');
app.use('/categories', categoryRoutes);

app.use(authRoutes);
app.use(prostorijeRoutes);

app.get('/', (req, res) => {
    res.send('It works.')
})

app.listen(process.env.PORT || 8080, process.env.IP, () => {
    console.log('Server started...');
})