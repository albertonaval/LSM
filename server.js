const app = require("./app")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))


const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:27017:${PORT}`);
})
