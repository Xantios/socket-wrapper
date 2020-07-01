## Socket wrapper

Just a simple unix socket wrapper using JWT, please DO NOT expose things to the internet !!

## Config
the config file is a simple json file, just replace some values and you should be good to go

### Run

**Using docker**
```bash
docker build . -t socket-wrapper
docker run --name socket-wrapper -p 8080:3000 socket-wrapper
```

**Without docker**
```bash
npm start
```

### Usage

Send a username and a password to ```/users/authenticate``` and save the token you get back

Use this token in all other requests to connect to your unix-socket over HTTP