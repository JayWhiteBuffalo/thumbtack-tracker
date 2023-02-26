const { Schema, model } = require('mongoose');
const Email = require('./Email')
// const emailSchema = require('./Email');

const inboxSchema = new Schema(
    {
        name: {
            type: String
        },
        // emails: [emailSchema]
        emails: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Email'
            }
        ]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        }
    }
);

const Inbox = model('Inbox', inboxSchema);
module.exports = Inbox;