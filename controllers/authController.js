import bcrypt from 'bcrypt';

// Temporary in-memory storage for demo purposes
const users = [];

// Render registration page
export const showRegister = (req, res) => {
    res.render('pages/register', { error: null});
};

// Handle registrationn form submission

export const registerUser = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.render('pages/register', { error: 'Passwords do not match'});
        };

        const hashedPassword = await bcrypt.hash(password, 12);
        users.push({ username, password: hashedPassword });
        res.render('pages/success', { message: 'Registration successful! Please log in.'});

    } catch (error) {
        res.render('pages/error', { message: error.message });
    }
};

// Render login page

export const showLogin = (req, res) => {
    res.render('pages/login', { error: null });
};

// Handle login
export const loginUser = async(req, res) => {
    try {
        const { username, password } = req.body;

        const user = users.find((u) => u.username === username);
        if (!user || !(await bcrypt.compare(password, user.password) )) {
            return res.render('pages/login', { error: 'Invalid username or password'});
        }

        req.session.user = username;
        res.render('pages/success', { message: `Welcome, ${username}! You are logged in.`});

    } catch (error) {
        res.render('pages/error', { message: error.message });
    }
};

// Handle logout
export const logoutUser = (req, res) => {
    res.session.destroy(() => {
        res.render('pages/success', { message: 'You are logged out.'});
    });
};