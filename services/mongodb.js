const mongoose = require('mongoose');
  module.exports = () => {
    mongoose.connect('mongodb+srv://dbUser:sadece0ben@noteapp.kp1in.mongodb.net/NoteApp?retryWrites=true&w=majority', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});    
      mongoose.connection.on('open', () => {
      });
        mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
  });
         
  mongoose.Promise = global.Promise;
};
