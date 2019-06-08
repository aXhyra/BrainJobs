const User = require('../models').User;
const saltHash = require('../saltHash');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
    create(req, res) {
        const hash = saltHash(req.body.password)
        return User
            .findOrCreate( {
                where: {username: req.body.username},
                defaults: {
                username: req.body.username,
                email: req.body.email,
                password: hash.passwordHash,
                salt: hash.salt
            }})
            .then(user => {
                if (user[1]) {
                    res.json({
                        statusC: 200,
                        success: true,
                        message: 'User created'
                    });
                } else {
                    res.json({
                        statusC: 409,
                        success: false,
                        message: 'User already exists'
                    })
                }

        })
            .catch(error => res.status(200).send(error));
    },
    search(req, res) {
        return User
            .findOne({
                where: { username: req.body.username },
                attributes: ['id', 'username', 'password', 'salt']
            })
            .then(user => {
                let isAdmin = (user.username == 'admin')
                const token = jwt.sign({
                        user_id: user.id,
                        isAdmin: isAdmin
                    },
                    config.secret, {
                        expiresIn: '1h'
                    }
                );
                if (saltHash.sha512(req.body.password, user.salt).passwordHash === user.password) {
                    res.status(200).json({
                        success: true,
                        message: 'logged in',
                        toekn: token
                    })
                } else {
                    res.json({
                        statusC: 400,
                        success: false,
                        message: 'Invalid username or password'
                    })
                }
            })
            .catch(err => res.json({
                status: 400,
                success: false,
                message: 'Invalid username or password'
            }))
    }
}