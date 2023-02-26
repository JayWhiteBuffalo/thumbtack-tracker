const { Schema, model } = require('mongoose');

const emailSchema = new Schema(
    {
        date: {
            type: Date,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Email = model('Email', emailSchema);
    module.exports = Email;
// module.exports = emailSchema;