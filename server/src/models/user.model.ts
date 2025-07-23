export default(sequelize:any,DataTypes:any)=>{
    const User=sequelize.define('User',{
        name:{type:DataTypes.STRING},
        email:{type:DataTypes.STRING,
        unique:true,
            validate:{
                isEmail:true,
            }
        },
        password:{type:DataTypes.STRING},
        Bio:{type:DataTypes.STRING},
    },{
        underscored:true,
        timestamps:true
    })
    User.associate=(models:any)=>{
        User.hasMany(models.Post)
    }
    return User;
}