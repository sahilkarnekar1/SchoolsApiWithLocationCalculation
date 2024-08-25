// models/School.js
const db = require('../config/db');

const School = {
    add: (school, callback) => {
        const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
        db.query(query, [school.name, school.address, school.latitude, school.longitude], callback);
    },

    list: (callback) => {
        const query = `SELECT * FROM schools`;
        db.query(query, callback);
    },
};

module.exports = School;
