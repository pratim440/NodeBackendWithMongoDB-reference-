const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.CONNECTION_URL, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => {
    console.log("DB connected successfully");
})
.catch(err => {
    console.log(err);
});
