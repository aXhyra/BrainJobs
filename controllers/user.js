const User = require('../models').User;
const saltHash = require('../saltHash');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
    create(req, res) {
        const hash = saltHash(req.body.password)
        return User
            .create({
                username: req.body.username,
                email: req.body.email,
                password: hash.passwordHash,
                salt: hash.salt
            })
            .then(user => res.status(201).json({
                success: true,
                message: 'User created'
            }))
            .catch(error => res.status(400).send(error));
    },
    search(req, res) {
        return User
            .findOne({
                where: { username: req.body.username },
                attributes: ['id', 'password', 'salt']
            })
            .then(user => {
                const token = jwt.sign({
                        user_id: user.id
                    },
                    config.secret, {
                        expiresIn: (30 * 60 * 1000)
                    }
                );
                if (saltHash.sha512(req.body.password, user.salt).passwordHash === user.password) {
                    res.status(200).json({
                        success: true,
                        message: 'logged in',
                        toekn: token
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
    }
}