var Budget = require("../models/budget");

module.exports = function(app) {
  app.get("/api/budget", function(req, res) {
    Budget.find({}).then(function(data) {
      res.send(data);
    });
  });

  app.post("/api/budget", (req, res) => {
    Budget.create(req.body)
      .then(db => {
        res.json(db);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.delete("/api/budget", function(req, res) {
    Budget.deleteMany().then(
      console.log("Done!")
    );
  });

};
