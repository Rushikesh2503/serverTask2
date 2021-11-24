const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{type:String, required: true},
    lastName:{type: String, required: true},
    email:{type:String, required: true},
    password:{type: String, required: true}
},{
    versionKey:false,
    timestamps:true,
})
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
  
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    next();
  });
  
  userSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password;
    return bcrypt.compareSync(password, passwordHash);
  };

const User=mongoose.model("user",userSchema);
module.exports = User;