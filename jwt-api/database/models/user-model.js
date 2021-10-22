let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now },
    roles: [{ type: String }],
    tokenVersion: { type: Number, required: true, default: 0 }
}, { id: false })

UserSchema
    .virtual('url')
    .get(function () {
        return '/api/user/' + this._id;
    });

UserSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('User', UserSchema)