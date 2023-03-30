const { QueryTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

async function getUserPicture({ email }) {
    const res = await sequelize.query(`SELECT picture FROM mdl_user WHERE email like ?`, {
        replacements: [email],
        type: QueryTypes.SELECT
    });
    return res[0]?.picture;
}

exports.getUserPicture = getUserPicture
