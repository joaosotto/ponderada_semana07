const pool = require('../database/db'); 
const fs = require('fs');
const path = require('path');

const query = fs.readFileSync(path.join(__dirname, '../database/create_tables.sql'), 'utf8');

pool.query(query, (err) => {
    if (err) {
        console.error('Error executing create_tables.sql', err.stack);
        pool.end(); 
        process.exit(1);
    } else {
        console.log('Tables created successfully.');
        pool.end();
    }
});
