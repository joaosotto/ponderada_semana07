const pool = require('../database/db'); 
const fs = require('fs');
const path = require('path');

const query = fs.readFileSync(path.join(__dirname, '../database/seed.sql'), 'utf8');

pool.query(query, (err) => {
    if (err) {
        console.error('Error executing seed.sql', err.stack);
        pool.end();
        process.exit(1);
    } else {
        console.log('Database seeded successfully.');
        pool.end();
    }
});
