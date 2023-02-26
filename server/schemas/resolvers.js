const {Inbox} = require('../models');
const Email = require('../models/Email')

const resolvers = {

    Query: {

    //Get All Inboxs - Working
        getInbox: async () => {
            const inbox = await Inbox.find().populate('emails');
            
            return inbox;
        },
    //Get Inbox by ID - Working
        getOneInbox: async (parent, { _id }) => {
            const inbox = await Inbox.findById(_id).populate(
                'emails');
            if (inbox.emails !== null && inbox.emails !== undefined) {
                return inbox.toJSON();
              }
              return { ...inbox.toJSON(), emails: [] }; // return an empty array if emails is null or undefined
            },
        
    //Get all Emails - Working
        openInbox: async () => {
            return Email.find();
            // return emailSchema.find()
        },
    //Get One Email by ID - Working
        getEmail: async(parent, { _id }) => {
            const email =  Email.findById(_id);
            return email
        },
    },

    Mutation: {

        //Add Inbox - Working
        addInbox: async (parent, { name }) => {
            const newInbox = await Inbox.create({name, emails: []});
            return newInbox
        },

        //Delete Inbox by ID - Working
        deleteInbox: async (parent, { _id }, err) => {
            const inbox = await Inbox.findByIdAndDelete({ _id });
            return inbox
        },

        //Add Email - Working
        addEmail: async (parent, { inboxId, email}) => {
            const newEmail = await Email.create(email);
            const newEmailId = newEmail.id;
            const updatedInbox = await Inbox.findOneAndUpdate(
                    { _id: inboxId },
                    { $push: {emails: newEmailId} },
                    { new: true}
                    ).populate('emails');
                    console.log(updatedInbox)
                    return updatedInbox;
        },
        //Delete Email
        deleteEmail: async (parent, { _id }) => {
            const deletedEmail = await Email.findByIdAndDelete(_id);
            if (!deletedEmail) {
              return null;
            }
            const inbox = await Inbox.findOneAndUpdate(
              { emails: _id },
              { $pull: { emails: _id } },
              { new: true }
            );
            console.log(inbox)
            return deletedEmail;
          }
        },
};


module.exports = resolvers;
