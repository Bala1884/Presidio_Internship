'use strict';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addColumn('posts', 'likes', {
    type: Sequelize.INTEGER,
    defaultValue: 0, // Sets default value for existing and future rows
    allowNull: false
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.removeColumn('posts', 'likes');
};
