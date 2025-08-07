'use strict';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  // Add replies to comments
  await queryInterface.addColumn('comments', 'parent_comment_id', {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'comments',
      key: 'id',
    },
    onDelete: 'CASCADE',
  });

  // Add likes counter to comments
  await queryInterface.addColumn('comments', 'likes', {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.removeColumn('comments', 'parentCommentId');
  await queryInterface.removeColumn('comments', 'likes');
};
