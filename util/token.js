var jwt = require('jsonwebtoken');

class jwtHelper{
    async generateToken(data){
        var encode=jwt.sign(data, 'secret', { expiresIn: '1000h' });
        return encode
    }


    async verifyToken(token){
        var decoded = jwt.verify(token, 'secret');
        return decoded
    }
}

module.exports=new jwtHelper()



