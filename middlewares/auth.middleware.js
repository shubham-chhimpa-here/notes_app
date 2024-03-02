const { verify } = require("jsonwebtoken")

const userAuth = (req, res, next) => {
    const token = req.cookies['token'];

    verify(token, process.env.jwtKey, (err, payload) => {
        if(err) res.send({msg: 'login first'});
        
        req.body = {...req.body , userId: payload.userId}
        next()
    })
    
    

}

module.exports = {
    userAuth
}