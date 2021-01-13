const Usuario = require("../models/usuario.model.js");

// Create and Save a new usuario
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a usuario
    const usuario = new Usuario({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        CPF: req.body.CPF,
        data_nasc: req.body.data_nasc,
        tipo: 0,
        email: req.body.email,
        senha: req.body.senha
    });

    // Save usuario in the database
    Usuario.create(usuario, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Usuario."
            });
        else res.send(data);
    });
};

// Retrieve all usuarios from the database.
exports.findAll = (req, res) => {
    Usuario.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving usuarios."
            });
        else res.send(data);
    });
};

// Find a single usuario with a usuarioId
exports.findOne = (req, res) => {
    Usuario.findById(req.params.usuarioId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found usuario with id ${req.params.usuarioId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving usuario with id " + req.params.usuarioId
                });
            }
        } else res.send(data);
    });
};

// Update a usuario identified by the usuarioId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Usuario.updateById(
        req.params.usuarioId,
        new Usuario(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found usuario with id ${req.params.usuarioId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating usuario with id " + req.params.usuarioId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a usuario with the specified usuarioId in the request
exports.delete = (req, res) => {
    Usuario.remove(req.params.usuarioId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found usuario with id ${req.params.usuarioId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete usuario with id " + req.params.usuarioId
                });
            }
        } else res.send({ message: `usuario was deleted successfully!` });
    });
};

// Delete all usuarios from the database.
exports.deleteAll = (req, res) => {
    Usuario.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all usuarios."
            });
        else res.send({ message: `All usuarios were deleted successfully!` });
    });
};