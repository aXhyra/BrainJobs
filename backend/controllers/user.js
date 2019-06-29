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
                        success: true,
                        message: 'User created'
                    });
                } else {
                    res.status(409).json({
                        success: false,
                        message: 'User already exists'
                    })
                }

        })
            .catch(error => {
                console.log(error)
                res.status(400).send(error)
            });
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
                    res.json({
                        success: true,
                        message: 'logged in',
                        isAdmin: isAdmin,
                        token: token
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Invalid username or password'
                    })
                }
            })
            .catch(err => res.status(400).json({
                success: false,
                message: 'Invalid username or password'
            }))
    },
    getUsers(req, res) {
        if (req.decoded.isAdmin) {
            return User
                .findAll({
                    attributes: 'username'
                })
                .then(user => {
                    res.send(user);
                })
                .catch(err => {
                    res.status(500).send(err);
                })
            } else {
                res.sendStatus(401);
            }
    }
}