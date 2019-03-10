const config = require('config');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let user = {
  totalPoints: 20000,
  history: []
}

app.get('/points', (req, res) => {
  res.json({ totalPoints: user.totalPoints });
});

app.get('/history', (req, res) => {
  res.json({ history: user.history });
});

app.post('/', (req, res) => {
  const newEntry = {
    percentage: req.body.percentage,
    flexScore: req.body.sensorScores.flexScore,
    zValueScore: req.body.sensorScores.zValueScore,
    xValueScore: req.body.sensorScores.xValueScore
  }

  user = {
    totalPoints: user.totalPoints += req.body.points,
    history: [...user.history, newEntry]
  }

  res.json({ user: user });
});

app.post('/purchase', (req, res) => {
  user = {
    ...user,
    totalPoints: user.totalPoints -= req.body.purchase
  }
  res.json({ totalPoints: user.totalPoints });
});

const port = config.get('port');
app.listen(port, () => {
  console.log(`[Score Registry] Service running on port ${port}`);
});
