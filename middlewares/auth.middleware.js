const { verify } = require("jsonwebtoken")

const userAuth = (req, res, next) => {
    const { authorization = 'null' } = req.headers;

    if (authorization.includes('Bearer')) {
        const token = authorization.split('Bearer ')[1];
        
        verify(token, process.env.jwtKey, (err, payload) => {
            if (err) res.send({ msg: 'login first' });
            else {
                req.body.userId = payload.userId;
              
                next()
            }
        })
    }
    else {
        res.send({ msg: 'send cookies ' })  

    }



}

module.exports = {
    userAuth
}