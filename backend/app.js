const   
        app = require('express')(),
        cors = require('cors');

app.use(cors());
// ROUTES
const 
        authRoutes = require('./controllers/auth/auth'),
        prostorijeRoutes = require('./controllers/prostorije'),
        usersRoutes = require('./controllers/users'),
        roleRoutes = require('./controllers/roles');

const categoryRoutes = require('./controllers/categories');
app.use('/categories', categoryRoutes);

app.use(authRoutes);
app.use(prostorijeRoutes);
app.use('/users', usersRoutes);
app.use('/roles', roleRoutes);

app.get('/', (req, res) => {
    res.send('It works.')
})

app.listen(process.env.PORT || 8080 , process.env.IP, () => {
    console.log('Server started...');
})