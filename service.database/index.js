const config = require('config');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let user = {
  totalPoints: 0,
  percentageHistory: []
}

app.get('/points', (req, res) => {
  res.json({ totalPoints: user.totalPoints });
});

app.get('/history', (req, res) => {
  res.json({ percentageHistory: user.percentageHistory });
});

app.post('/', (req, res) => {
  user = {
    ...user,
    totalPoints: user.totalPoints += req.body.points,
    percentageHistory: [...user.percentageHistory, req.body.percentage]
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
