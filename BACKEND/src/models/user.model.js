import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
    },
    email : { type : String, required : true},
    password : { type : String, required : true},
    accessToken : { type : String},
},
{timestamps: true}
)

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// userSchema.pre("save", async function(next){
//     if(!this.isModified("password")) return next();

//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// })

// userSchema.methods.isPasswordCorrect = async function(password){
//     return await bcrypt.compare(password, this.password)
// }



export const User = mongoose.model('User', userSchema)