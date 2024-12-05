import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = 300;

//Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(
    session({
        secret: 'secretodekey',
        resave: false,
        saveUninitialized: true,
    })
);

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/', authRoutes);

// Error handling
app.use((req, res) => {
    res.status(404).render('pages/error', { message: 'Page not found'});
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});