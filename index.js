const express = require('express');
const csv = require('csvtojson');

const app = express();

app.use(express.static('src'));

app.get('/start', async (req, res) => {
    
        const csv1 = await csv().fromFile('jobs_in_data.csv');
        const csv2 = await csv().fromFile('job_salary_by_year.csv');
        
        res.send({ csv1, csv2 });

});

app.listen(8080, () => {
    console.log("Server started");
});
