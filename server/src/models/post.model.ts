export default (sequelize: any, DataTypes: any) => {
  const Post = sequelize.define(
    'Post',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      likes :{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
      },
      tags: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_urls: {
        type: DataTypes.ARRAY(DataTypes.STRING), // stores multiple Cloudinary URLs
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
      tableName: 'posts',
      timestamps: true,
    }
  );

  Post.associate = (models: any) => {
    Post.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });
    Post.hasMany(models.Comment, { foreignKey: 'post_id', as: 'comments' });
    Post.hasMany(models.Like, { foreignKey: 'post_id', as: 'post_likes' });
  };

  return Post;
};
