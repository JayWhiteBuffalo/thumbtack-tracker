//import dependencies
const faker = require('faker');
const db = require('../config/connection');
const { Inbox } = require('../models');
const Email = require('../models/Email');

db.once('open', async () => {
  await Inbox.deleteMany({});
  await Email.deleteMany({});

  const inboxData = [];
  for (let i = 0; i < 3; i += 1) {
    const name = faker.internet.email();
    inboxData.push({ name });
 }

 const createdInboxes = await Inbox.collection.insertMany(inboxData);


   // create Email data
   let createdEmails = [];
     for (let i = 0; i < 20; i += 1) {
       const subject = faker.lorem.words(Math.round(Math.random() * 5) + 1);
       const  date = faker.date.past();
       const body = faker.lorem.words(Math.round(Math.random() * 20) + 1);

       const randomInboxIndex = Math.floor(Math.random() * createdInboxes.ops.length);
        const { _id: inboxId } = createdInboxes.ops[randomInboxIndex];
        const inbox = inboxId
        
       const createdEmail = await Email.create({subject, date, body});
       const updatedInbox = await Inbox.updateOne(
        { _id: inboxId },
        { $push: { emails: createdEmail._id } }
      );
      createdEmails.push(createdEmail);
    }

  console.log('all done!');
  process.exit(0);
});
