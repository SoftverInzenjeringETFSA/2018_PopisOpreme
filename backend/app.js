const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const
        app = require('express')(),
        cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// ROUTES
const 
        authRoutes = require('./controllers/auth/auth'),
        prostorijeRoutes = require('./controllers/prostorije/prostorije'),
        usersRoutes = require('./controllers/users'),
        roleRoutes = require('./controllers/roles'),
        auditRoutes = require('./controllers/audit/audit');
        stavke = require('./controllers/stavke/stavke')

const categoryRoutes = require('./controllers/categories');
app.use('/categories', categoryRoutes);

app.use(stavke);
app.use(authRoutes);
app.use(auditRoutes);
app.use(prostorijeRoutes);
app.use('/users', usersRoutes);
app.use('/roles', roleRoutes);


app.get('/', (req, res) => {
    res.send('It works.')
})

app.listen(process.env.PORT || 8080 , process.env.IP, () => {
    console.log('Server started...');
})