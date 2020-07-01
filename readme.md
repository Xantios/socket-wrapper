## Socket wrapper

Just a simple unix socket wrapper using JWT, please DO NOT expose things to the internet !!

## Config
the config file is a simple json file, just replace some values and you should be good to go

### Run

**Using docker-hub**

Generate something like this:
```{
    "jwtSecret": "changeme",
    "users": [
        {
            "username": "example",
            "password": "changeme"
        }
    ],
    "whitelist": [
        "::1",
        "172.0.0.0/8",
        "127.0.0.0/8",
        "192.168.0.0/16"
    ],
    "unixSocket": "/var/run/docker.sock"
}```

and run 
```bash 
docker run --name socket-wrapper -v ./config.json:/app/config.json -p 8080:3000 xantios/socket-wrapper
```

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