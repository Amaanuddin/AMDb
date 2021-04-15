const jwt = require('jsonwebtoken');

exports.isAuth = (authHeader) => {
    if (!authHeader) {
        return false;
    }
    const token = authHeader.split(' ')[1];

     if (!token || token === '') {
        return false;
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretkey');
    } catch (err) {
        return false;
    }
    if (!decodedToken) {
        return false;
    }
    return decodedToken;
}