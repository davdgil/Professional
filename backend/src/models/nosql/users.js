const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'comerciante', 'usuario', 'anonimo'], // Lista de roles válidos
        default: 'usuario'
    },
    city: {
        type: String,
        required: true
    },
    interests: [String]
}, {
    timestamps: true // añade createdAt y updatedAt automáticamente
});

// Agregar el plugin mongoose-delete al esquema
userSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
