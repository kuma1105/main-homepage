export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "CCIT";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user;
    next();
}