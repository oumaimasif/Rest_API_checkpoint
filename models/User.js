import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: { type: String },
    age: Number,
    email: String,
    city: String
});
//exporter le modele user pour l'utiliser a eur ./userSchema
const User = mongoose.model('User', userSchema);

export default User;