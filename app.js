import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ExpressJwt from 'express-jwt';
import request from 'request';
import ipRangeCheck from 'ip-range-check';

import errorHandler from './error-handler';
import auth from './auth';

const app = express();
const router = express.Router();

// Pull config file
global.config = require('./config.json');

// Setup express jwt
const jwtSecret = config.jwtSecret;
let expressJwt = ExpressJwt({secret: jwtSecret}).unless({

    // Exclude login route.
    path: [
        '/users/authenticate'
    ],
    custom: (req) => {
        // feel free to add req.headers['x-forwarded-for'] however, the x-forwarded-for can easely be spoofed.
        let ip = req.connection.remoteAddress;
        return ipRangeCheck(ip,config['whitelist']);
    }

});

// Decorate express 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(expressJwt);

// Set routes
app.use('/users/authenticate',(req,res,next) => {
    auth.auth(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({message: 'Username or password incorrect'}))
        .catch(err => next(err))
});

app.use('/users/validate',(req,res,next) => {
    res.json({success: true,msg: "It works"})
});

app.use((req,res,next) => {

    let unixWrapper = 'http://unix:'+config.unixSocket+":"+req.url;

    const options = {
        uri: unixWrapper,
        method: req.method,
        headers: {
            host: 'validhost.tld', // The request library doesnt set the host value to a http valid string
        },        
    }

    request(options,(err,resp,body) => {

        if(err) {
            console.error('Error :: ',err);
            return next(err);
        }

        // We can defice Json without any trouble :)
        if(resp.headers["content-type"] == "application/json") {
            resp.body = JSON.parse(resp.body);
        }

        res.send(resp);
    });
        
});

// Set error handler
// After route, because routes get evaluate top to bottom
app.use(errorHandler);

const port = 3000 || process.env.PORT;
const server = app.listen( port,() => console.log(`Server listening on ${port}`));