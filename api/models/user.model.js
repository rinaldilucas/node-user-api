const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        email: { type: String, trim: true, required: true, unique: true },
        username: { type: String, required: true, trim: true, minlength: 5 },
        first_name: { type: String, trim: true, required: true },
        last_name: { type: String, trim: true, required: true },
        is_active: { type: Boolean, required: true, default: false },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = mongoose.model('User', UserSchema);
