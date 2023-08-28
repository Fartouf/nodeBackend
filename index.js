const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');


const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

let currentImage = 'rep.svg';  // default image

// Serve static files from the 'public' directory --> nous permet de "load les images et la page html"
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());


// Serve the main index.html file for any other route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
}
);

app.post('/api/setImage', (req, res) => {
    if(req.body.imageName) {
        currentImage = req.body.imageName;
        res.json({ success: true, image: currentImage });
    } else {
        res.status(400).json({ success: false, message: 'imageName not provided' });
    }
});

app.get('/api/getImage', (req, res) => {
    res.send({"currentImage" : currentImage});
});



