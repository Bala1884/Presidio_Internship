export default (sequelize: any, DataTypes: any) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    parentCommentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'comments',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'comments',
  });

  Comment.associate = (models: any) => {
    Comment.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
    Comment.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });
    Comment.hasMany(models.Like, { foreignKey: 'commentId', as: 'comment_likes' });

    Comment.belongsTo(models.Comment, {
      foreignKey: 'parentCommentId',
      as: 'parent',
    });

    Comment.hasMany(models.Comment, {
      foreignKey: 'parentCommentId',
      as: 'replies',
    });
  };

  return Comment;
};
