'use strict';

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('likes', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'posts', key: 'id' },
      onDelete: 'CASCADE',
    },
    commentId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'comments', key: 'id' },
      onDelete: 'CASCADE',
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

  // Uniqueness constraints
  await queryInterface.addConstraint('likes', {
    fields: ['userId', 'postId'],
    type: 'unique',
    name: 'unique_user_post_like'
  });

  await queryInterface.addConstraint('likes', {
    fields: ['userId', 'commentId'],
    type: 'unique',
    name: 'unique_user_comment_like'
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('Likes');
};
