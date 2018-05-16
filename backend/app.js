const   
        app = require('express')();

// ROUTES
const 
        authRoutes = require('./controllers/auth/auth');

app.use(authRoutes);

app.get('/', (req, res) => {
    res.send('It works.')
})

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log('Server started...');
})