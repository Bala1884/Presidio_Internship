export default (sequelize: any, DataTypes: any) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tags: {
      type: DataTypes.STRING, // Can be stored as comma-separated string
      allowNull: true,
    },
  }, {
    underscored: true, // to match `user_id`, `created_at`, etc.
    tableName: 'posts',
    timestamps: true,
  });

  Post.associate = (models: any) => {
    Post.belongsTo(models.User, { foreignKey: 'user_id' });
    Post.hasMany(models.Comment); // make sure Comment model exists
  };

  return Post;
};
