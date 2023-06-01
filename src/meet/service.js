const pool = require("../../db");
//const queries = require("./queries");
const bcrypt = require("bcrypt");
const { password, rows } = require("pg/lib/defaults");
const jwt = require("jsonwebtoken");
const { jwtTokens } = require("../../utils/jwt-helper");
const router = require("./routes");
const general = require("../../utils/general")
const sendEmail = require("../../utils/email")
const { Op } = require("sequelize");

const Meet = pool.meet;


const getMeeting = async (id) => {
    //let condicion = {host:id}

    //console.log(id);
    if(id){
        let condicion = {id:id}
        const meet = await Meet.findAll({where:condicion, attributes: { exclude: ['createdAt', 'updatedAt'] } });

        return meet;
    }else{
        const meet = await Meet.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

        return meet;
    }



};

const createMeeting = async (meet) => {

    try {
        
        let save = await Meet.create(meet);
        _id = save.dataValues.id;

        return ({ data: { msg: 'registro existoso', id: _id }, error: false });

    } catch (error) {
        console.log("ERROR",error)
        if (error.original.detail) {
            return ({ data: error.original.detail, error: true })

        } else {
            return ({ data: error, error: true })

        }

    }

}

const updateMeeting = async (meet, idmeet) => {
    let condition = {};


    try {
        const updatedRows = await Meet.update(
            meet,
            {
                where: condition,
            }
        );
        if (updatedRows[0] !== 0) {
            return ({ data: 'registro existoso', error: false })

        } else {
            return ({ data: 'Algo inesperado ha pasado', error: true })

        }
    } catch (error) {
        console.log(error);
        return ({ data: error.original.detail, error: true })


    }

};

const deleteMeeting = async (idmeet) => {
    let condition = {};


    try {
        const deleteRows = await Meet.destroy({
            where: {
              id: idmeet
            }
          });
        if (deleteRows === 1) {
            return ({ data: 'Eliminado existosamente', error: false })

        } else {
            return ({ data: 'Algo inesperado ha pasado', error: true })

        }
    } catch (error) {
        console.log(error);
        return ({ data: error.original.detail, error: true })


    }

}




module.exports = {
    getMeeting,
    createMeeting,
    updateMeeting,
    deleteMeeting
};