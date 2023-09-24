
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000; 

// // Define routes and middleware here

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const connectToMongo = require("./DB.js");
const express = require('express');
var cors = require('cors')
connectToMongo();
const app = express()
const port = process.env.PORT || 5000;
app.use(cors())

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//available Routes
app.use('/api/auth', require("./routes/auth"))
// app.use('/api/notes', require("./routes/notes"))
app.listen(port, () => {
    console.log(`i-Notebook app listening at http://localhost:${port}`)
})