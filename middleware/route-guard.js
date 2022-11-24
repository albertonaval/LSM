
function isLoggedIn(req, res, next) {
    if (req.session.currentUser) {
        req.app.locals.username = req.session.currentUser.username
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Inicia sesión para acceder' })
    }
}

function isLoggedOut(req, res, next) {
    if (!req.session.currentUser) {
        next()
        req.app.locals.username = null
    } else {
        res.redirect('/profile')
    }
}

const checkRoles = (...rolesToCheck) => (req, res, next) => {
    //console.log(req.session.currentUser.role)
    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: `No tienes permisos de ${rolesToCheck}` })
    }
}
const roles = ((req, res, next) => {
    if (req.session.currentUser) {
        if (req.session.currentUser.role === 'ADMIN') {
            req.app.locals.admin = req.session.currentUser.role

        } else {
            req.app.locals.user = req.session.currentUser.role
        }

    } else {
        req.app.locals.admin = null
        req.app.locals.user = null

    }
    next()
})

module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRoles,
    roles
}