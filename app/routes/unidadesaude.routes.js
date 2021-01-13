module.exports = app => {
    const us = require("../controllers/unidadesaude.controller.js");

    // Create a new Customer
    app.post("/unidadesaude", us.create);

    // Retrieve all usuarios
    app.get("/unidadesaude", us.findAll);

    // Retrieve a single Customer with usuarioId
    app.get("/unidadesaude/:usId", us.findOne);

    // Update a Customer with usuarioId
    app.put("/unidadesaude/:usId", us.update);

    // Delete a Customer with usuarioId
    app.delete("/unidadesaude/:usId", us.delete);

    // Create a new Customer
    // app.delete("/unidadesaude", us.deleteAll);
};