import jwt from 'jsonwebtoken';

const config = require('./config.json');

module.exports = { auth };

async function auth({username,password}) {
        const user = config.users.find(u=> u.username==username && u.password == password);
        if(user) {
            const token = jwt.sign({sub: user.username},config.jwtSecret);
            const {password,...userWithoutPassword} = user;
            return {
                ...userWithoutPassword,
                token
            };
        }
}