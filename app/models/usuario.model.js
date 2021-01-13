const sql = require("./db.js");

// constructor
const Usuario = function (usuario) {
    this.nome = usuario.nome;
    this.sobrenome = usuario.sobrenome;
    this.CPF = usuario.CPF;
    this.data_nasc = usuario.data_nasc;
    this.tipo = 0;
    this.email = usuario.email;
    this.senha = usuario.senha;
};

Usuario.create = (novoUsuario, result) => {
    sql.query("INSERT INTO USUARIOS SET ?", novoUsuario, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("Usuário criado:: ", { id: res.insertId, ...novoUsuario });
        result(null, { id: res.insertId, ...novoUsuario });
    });
};

Usuario.findById = (usuario, result) => {
    sql.query(`SELECT * FROM USUARIOS WHERE id_usuario = ${usuario}`, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Usuário encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "Não encontrado" }, null);
    });
};

Usuario.getAll = result => {
    sql.query("SELECT * FROM USUARIOS", (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(null, err);
            return;
        }

        console.log("Usuário: ", res);
        result(null, res);
    });
};

Usuario.updateById = (id, usuario, result) => {
    sql.query(
        `UPDATE USUARIOS SET nome = ?, sobrenome = ?, CPF = ?,
        data_nasc = STR_TO_DATE(?, '%m/%d/%Y'), tipo = ?, email = ?, senha = ?
        WHERE id_usuario = ?`,
        [usuario.nome, usuario.sobrenome, usuario.CPF, usuario.data_nasc, usuario.tipo, usuario.email, usuario.senha, id],
        (err, res) => {
            if (err) {
                console.log("Erro: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "Não encontrado" }, null);
                return;
            }

            console.log("Usuário atualizado: ", { id: id, ...usuario });
            result(null, { id: id, ...usuario });
        }
    );
};

Usuario.remove = (id, result) => {
    sql.query("DELETE FROM USUARIOS WHERE id_usuario = ?", id, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "Não encontrado" }, null);
            return;
        }

        console.log("ID do usuário deletado: ", id);
        result(null, res);
    });
};

// Usuario.removeAll = result => {
//     sql.query("DELETE FROM USUARIOS", (err, res) => {
//         if (err) {
//             console.log("Erro: ", err);
//             result(null, err);
//             return;
//         }

//         console.log(` ${res.affectedRows} usuários deletados`);
//         result(null, res);
//     });
// };

module.exports = Usuario;