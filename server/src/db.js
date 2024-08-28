const { connect } = require('mongoose');

const connectDB = () => connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to DB!'))
    .catch(err => console.log("Couldn't connect to DB =>", err.message));

module.exports = connectDB;