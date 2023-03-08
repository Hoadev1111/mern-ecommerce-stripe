const User = require('../Models/AuthModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'hoadeptrai';
// const SECRET_KEY = process.env.SECRET_KEY_VALUE;



const signup = async (req, res) => {
    const { email, password } = req.body;
    // check user have already fill email and password;
    if (email.length === 0) {
        return res.status(400).json({ message: "Please enter your email!" })
    }

    if (password.length === 0) {
        return res.status(400).json({ message: "Please enter your password!" })
    }
    // check length password
    if (password.length < 6) {
        return res.status(400).json({ message: "Please enter at least 6 characters!" })
    }
    let existingUser;
    // find user in database whether has the same email or not
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        console.log(error);
    }
    // if database has a user has the same email, throw message
    if (existingUser) {
        return res.status(400).json({ message: "User already exit, Please login!" })
    }

    // before to send the database, hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // create new user
    const user = new User({
        email,
        password: hashedPassword,
    })
    // save use to the database
    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, {
        expiresIn: '30s',
    })

    res.cookie("auth-mern", token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: false,
        sameSite: "lax",
    })

    return res.status(201).json({ message: user });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    //    check email have already, if not, register
    let existingUser;
    try {
        existingUser = await User.findOne({ email });

    } catch (error) {
        return res.status(400).json({ message: error })
    }

    if (!existingUser) {
        return res.status(400).json({ message: "Email don't exist, Register Please!" })
    }
    // check password
    const isPasswordTrue = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordTrue) {
        return res.status(400).json({ message: "Wrong Password!" })
    }
    const token = jwt.sign({ id: existingUser._id }, SECRET_KEY, {
        expiresIn: '30s'
    })

    res.cookie("auth-mern", token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: false,
        sameSite: "lax",
    })
    return res.status(200).json({ message: "Login successful", user: existingUser, token })
};

const checkUser = async (req, res, next) => {
    const token_2 = req?.headers?.cookie?.split('=')[1];
    const token = req.cookies['auth-mern'] || token_2;
    console.log('token: ', token);

    if (token) {
        jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                res.json({ status: false });
                next();
            } else {
                const user = await User.findById(decodedToken.id, { password: 0 });
                if (user) res.json({ status: true, user });
                else res.json({ status: false });
                next();
            }
        }
        );
    } else {
        res.status(400).json({ message: "Token not found!" })
    }
};

const refreshToken = async (req, res, next) => {
    const token_2 = req?.headers?.cookie?.split('=')[1];
    const prevToken = req.cookies['auth-mern'] || token_2;

    if (!prevToken) {
        return res.status(400).json({ message: "Couldn't find token" })
    }

    jwt.verify(prevToken, SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication fail" })
        }

        // delete prev Cookie
        res.clearCookie('auth-mern');

        const token = jwt.sign({ id: user.id }, SECRET_KEY, {
            expiresIn: "35s"
        })

        console.log('refreshToken: ', token);

        res.cookie('auth-mern', token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: false,
            sameSite: 'lax',
        })
        next();
    })
}


module.exports = {
    login, signup, checkUser, refreshToken
}