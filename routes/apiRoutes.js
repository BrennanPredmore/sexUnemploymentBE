const fs = require('fs');

module.exports = (app) => {
    app.get('/api/sexUnemployment', (req, res) => {
        fs.readFile('db/sexUnemployment.json', (err, data) => {
          if (err) throw err;
          let sexUnemploymentData = JSON.parse(data);
          res.json(sexUnemploymentData);
        });
      });
}