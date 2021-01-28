const sql = require("./db.js");

// constructor
const UnidadeSaude = function (us) {
    this.nome = us.nome;
    this.endereco = us.endereco;
    this.tipo = us.tipo;
    this.categoria = us.categoria;
    this.cep = us.cep;
    this.telefone = us.telefone;
    this.descricao = us.descricao;
    this.status = us.status;
};

UnidadeSaude.create = (novaUS, result) => {
    novaUS.status = 1;
    sql.query("INSERT INTO UNIDADES_SAUDE SET ?", novaUS, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }
        console.log("US criada: ", { id_unidade_saude: res.insertId, ...novaUS });
        result(null, { id_unidade_saude: res.insertId, ...novaUS });
    });
};

UnidadeSaude.findById = (us, result) => {
    sql.query(`SELECT * FROM UNIDADES_SAUDE WHERE id_unidade_saude = ${us}
                AND STATUS = 1`, (err, res) => {
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
    sql.query("SELECT * FROM UNIDADES_SAUDE WHERE STATUS = 1", (err, res) => {
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
        `UPDATE UNIDADES_SAUDE SET nome = ?, endereco = ?, tipo = ?, categoria = ?, cep = ?, telefone = ?, descricao = ?, STATUS = ?
        WHERE id_unidade_saude = ?`,
        [us.nome, us.endereco, us.tipo, us.categoria, us.cep, us.telefone, us.descricao, us.status, id],
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
    sql.query("UPDATE UNIDADES_SAUDE SET status = 0 WHERE id_unidade_saude = ?", id, (err, res) => {
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