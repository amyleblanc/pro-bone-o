const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const PORT = 8080;

// express Configuration
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(express.static('public'));

// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

