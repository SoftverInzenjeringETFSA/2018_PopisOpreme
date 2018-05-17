const   
        app = require('express')();

// ROUTES
const 
        authRoutes = require('./controllers/auth/auth'),
        prostorijeRoutes = require('./controllers/prostorije');

const categoryRoutes = require('./controllers/categories');
app.use('/categories', categoryRoutes);

app.use(authRoutes);
app.use(prostorijeRoutes);

app.get('/', (req, res) => {
    res.send('It works.')
})

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log('Server started...');
})