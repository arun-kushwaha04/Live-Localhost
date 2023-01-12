const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
 res.send('Hello from local host /');
});

app.get('/test', (req, res) => {
 res.send('Hello from local host /test');
});

app.listen(5001, () => {
 console.log('sever running on port 5001');
});
