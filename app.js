const app = require('express')();
const jwt = require('jsonwebtoken');

app.get('/api', function(req, res) {
    res.json({
        message: 'Welcome to the API'
    })
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post created....',
                authData
            })
        }
    })

});


app.post('/api/login', (req, res) => {
    const user = {
        id: 1000,
        name: 'Petr',
        email: 'petr@petr.com'
    };

    jwt.sign(user, 'secretKey', (err, token) => {
        res.json({
            token
        })
    })
});


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ');
        req.token = bearerToken[1];
        next();
    } else {
        res.sendStatus(403);
    }
}


app.listen(7001, () => {
    console.log('Server started on port 7001')
});