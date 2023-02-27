const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('temperament', {
        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}