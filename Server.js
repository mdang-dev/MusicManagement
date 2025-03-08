import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/users', async function(req, res) {
   try {
     const response = await fetch(`http://localhost:4000/users`);
     const data = await response.json();
     res.send(data);
     res.sendStatus(200);
   }catch(err) {
     console.log(err);
   }
});

app.post('/register', (req, res) => {
  console.log(req.body);
  res.send('Hello World!' + req.body);
  res.sendStatus(200);
});

app.listen(5000, function () {
  console.log('Express server listening on port 5000.');
});
