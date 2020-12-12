module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('help_orders', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            student_id: {
                type: Sequelize.INTEGER,
                references: { model: 'students', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },
            question: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            answer: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            answer_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('help_orders');
    },
};