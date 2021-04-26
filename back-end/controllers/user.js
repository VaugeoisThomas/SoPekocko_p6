const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mask = require('maskdata');

require('dotenv').config()

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const maskOptions = {
                maskWith : "*",
                unmaskedStartCharactersBeforeAt: 0,
                unmaskedEndCharactersAfterAt: 257,
                maskAtTheRate: false
            }
            const maskedEmail = mask.maskEmail2(req.body.email, maskOptions);

            const user = new User({ email: maskedEmail, password: hash });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next)  => {
    const maskedEmail = mask.maskEmail2(req.body.email)
    if(maskedEmail === user.email){
        User.findOne({ email: req.body.email})
            .then(user => {
                if(!user) { return res.status(401).json({ message: 'Utilisateur non trouvé'});}
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid) { return res.status(401).json({ error: 'Mot de passe incorrect !'});}
                        res.status(200).json({
                            userId: user._id, 
                            token: jwt.sign({userId: user._id}, process.env.TOKEN, {expiresIn: '6h'})
                        });
                    })
                    .catch(error => res.status(500).json({error}));
            })
            .catch(error => res.status(500).json({error}));
    }
};