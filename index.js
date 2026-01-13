const express = require('express');
const cors = require('cors');
const { categories, poisByCategory, poiDetails } = require('./mockData'); 

const app = express();
app.use(cors());
app.use(express.json());


app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
   
    const validEmail = "admin@wiki.com";
    const validPassword = "12345";

   
    const inputEmail = String(email).trim();
    const inputPassword = String(password).trim();

    console.log("--- ΕΛΕΓΧΟΣ ---");
    console.log(`Έλαβα: '${inputEmail}' | Περίμενα: '${validEmail}'`);
    console.log(`Έλαβα: '${inputPassword}' | Περίμενα: '${validPassword}'`);

    if (inputEmail === validEmail && inputPassword === validPassword) {
        console.log("--> ΕΠΙΤΥΧΙΑ ✅");
        res.json({ accessToken: 'real-secret-token' });
    } else {
        console.log("--> ΑΠΟΤΥΧΙΑ ❌");
        res.status(401).json({ error: "Λάθος Email ή Κωδικός" });
    }
});

app.get('/api/pois/categories', (req, res) => {
    res.json({ categories });
});

app.get('/api/pois/categories/:categoryId', (req, res) => {
    const pois = poisByCategory[req.params.categoryId] || [];
    res.json({ pois });
});

app.get('/api/pois/:id', (req, res) => {
    const poiId = req.params.id;
    const details = poiDetails[poiId];
    if (details) {
        res.json(details);
    } else {
        res.status(404).json({ error: "Not Found" });
    }
});

app.listen(3000, '0.0.0.0', () => {
    console.log('--- SERVER READY ---');
});