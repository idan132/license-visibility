const app = require ('./server.js')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
const cors = require('cors')
const port = process.env.PORT;
app.listen(port, () => {
  console.log("license management application server started");
});