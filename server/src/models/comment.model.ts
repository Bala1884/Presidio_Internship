export default(sequelize:any,DataTypes:any)=>{
    const Comment=sequelize.define('Comment',{
        content:{type:DataTypes.STRING},
    },{
        timestamp:true
    })
    Comment.associate=(models:any)=>{
        Comment.belongsTo(models.Post);
    }
    return Comment;
}

