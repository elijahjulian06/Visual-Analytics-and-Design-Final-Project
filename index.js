const express = require('express');
const csv = require('csvtojson');

const app = express();

app.use(express.static('src'));


app.get('/start', (req,res) => {
    csv()
        .fromFile('jobs_in_data.csv')
        .then(data => {
            res.send(data);
        })
})

app.listen(8080, () => {
    console.log("Server started");
});