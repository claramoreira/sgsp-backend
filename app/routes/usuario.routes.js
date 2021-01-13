module.exports = app => {
    const usuarios = require("../controllers/usuario.controller.js");

    // Create a new Customer
    app.post("/usuarios", usuarios.create);

    // Retrieve all usuarios
    app.get("/usuarios", usuarios.findAll);

    // Retrieve a single Customer with usuarioId
    app.get("/usuarios/:usuarioId", usuarios.findOne);

    // Update a Customer with usuarioId
    app.put("/usuarios/:usuarioId", usuarios.update);

    // Delete a Customer with usuarioId
    app.delete("/usuarios/:usuarioId", usuarios.delete);

    // Create a new Customer
    // app.delete("/usuarios", usuarios.deleteAll);
};