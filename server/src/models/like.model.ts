
export default (sequelize : any, DataTypes:any) => {
  const Like = sequelize.define('Like', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'post_id',
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'comment_id',
    }
  },
  {
      tableName: 'likes',
      timestamps: true,
      underscored:true,
    });

  Like.associate = (models:any) => {
    Like.belongsTo(models.User, { foreignKey: 'userId', as:'user' });
    Like.belongsTo(models.Post, { foreignKey: 'postId', as:'post' });
    Like.belongsTo(models.Comment, { foreignKey: 'commentId',as: 'liked_comment' });
  };

  return Like;
};
