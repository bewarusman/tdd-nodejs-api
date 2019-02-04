'use strict';

const TodoModel = (sequelize, type) => {
    return sequelize.define('todos', {
        id: { type: type.UUID, primaryKey: true, defaultValue: type.UUIDV4 },
        text: { type: type.STRING, allowNull: false }
    });
};

module.exports = TodoModel;