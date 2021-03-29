const Sauce = require('../models/sauce');
const fs = require('fs');

/**
 * Export the function to create a sauce. 
 */
exports.createSauce = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce);
    delete sauceObjet._id;
    const sauce = new Sauce({ ...sauceObjet, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` });
    sauce.save()
        .then(() => res.status(201).json({ message: 'La sauce à bien été créée.' }))
        .catch(err => res.status(400).json({ err }));
};

/**
 * Export the function to display all sauces. 
 */
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error })); 
};

/**
 * Export the function to display one sauce. 
 */
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({error}));
}

/**
 * Export the function to modify a sauce. 
 */
exports.updateSauce = (req, res, next) => {
    const sauceObjet = req.file ? { ...JSON.parse(req.body.sauce), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : { ...req.body };
    Sauce.updateOne({_id: req.params.id} , {...sauceObjet, _id: req.params.id})
        .then(()=> res.status(200).json({message: 'Sauce modifiée avec succès !'}))
        .catch(err => res.status(500).json({ err }))
};

/**
 * Export the function to delete a sauce. 
 */
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({ message: 'Sauce supprimée'}))
                .catch(err => res.status(400).json({ err }));
            });
        })
        .catch(err => res.status(500).json({ err }));
};