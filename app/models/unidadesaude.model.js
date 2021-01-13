const sql = require("./db.js");

// constructor
const UnidadeSaude = function (us) {
    this.nome = us.nome;
    this.endereco = us.endereco;
    this.tipo = us.tipo;
};

UnidadeSaude.create = (novaUS, result) => {
    sql.query("INSERT INTO UNIDADES_SAUDE SET ?", novaUS, (err, res) => {

        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("US criada: ", { id: res.insertId, ...novaUS });
        result(null, { id: res.insertId, ...novaUS });
    });
};

UnidadeSaude.findById = (us, result) => {
    sql.query(`SELECT * FROM UNIDADES_SAUDE WHERE id_unidade_saude = ${us}`, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("US encontrada: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "US não encontrada" }, null);
    });
};

UnidadeSaude.getAll = result => {
    sql.query("SELECT * FROM UNIDADES_SAUDE", (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(null, err);
            return;
        }

        console.log("US: ", res);
        result(null, res);
    });
};

UnidadeSaude.updateById = (id, us, result) => {
    sql.query(
        `UPDATE UNIDADES_SAUDE SET nome = ?, endereco = ?, tipo = ?
        WHERE id_unidade_saude = ?`,
        [us.nome, us.endereco, us.tipo, id],
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

            console.log("US atualizada: ", { id: id, ...us });
            result(null, { id: id, ...us });
        }
    );
};

UnidadeSaude.remove = (id, result) => {
    sql.query("DELETE FROM UNIDADES_SAUDE WHERE id_unidade_saude = ?", id, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "Não encontrado" }, null);
            return;
        }

        console.log("US deletada: ", id);
        result(null, res);
    });
};

// UnidadeSaude.removeAll = result => {
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

module.exports = UnidadeSaude;