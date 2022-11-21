const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const bcryptjs = require('bcryptjs')
const saltRounds = 10
const { isLoggedOut } = require('../middleware/route-guard')


router.get('/signup', isLoggedOut, (req, res) => {
    res.render('auth/signUp')
})

router.post('/signup', isLoggedOut, (req, res, next) => {

    const { email, username, password } = req.body

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => {
            return bcryptjs.hash(password, salt)
        })
        .then(hashedPassword => {
            return User.create({ username, email, password: hashedPassword })
        })
        .then(() => res.redirect('/auth/login'))
        .catch(err => console.log(err))
})
router.get('/login', isLoggedOut, (req, res) => {
    res.render('auth/login')
})

router.post('/login', isLoggedOut, (req, res) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {

            if (!user) {
                res.render('auth/login', { errorMessage: 'Email no reconocido' })
                return
            }

            if (bcryptjs.compareSync(password, user.password) === false) {
                res.render('auth/login', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = user
            res.redirect('/profile')
        })
        .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/auth/login'))
})


module.exports = router