
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Course = sequelize.define("Course", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Course;