
const mongoose = require('mongoose');

async function testConn() {
    console.log('Testing MongoDB connection...');
    console.log('URI:', process.env.MONGODB_URI ? 'Defined' : 'UNDEFINED');
    try {
        await mongoose.connect(process.env.MONGODB_URI, { 
            connectTimeoutMS: 5000 
        });
        console.log('✅ Connected successfully');
        process.exit(0);
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
        process.exit(1);
    }
}

testConn();
