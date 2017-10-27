const express = require('express');
const app = express();
const PORT = process.env.PORT || 4090;

app.use(express.static('public'));

app.listen(PORT, function() {
  console.log('14eener_frontend running on port: ', 4090);
})
