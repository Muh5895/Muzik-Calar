require("dotenv").config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const SUPABASE_URL = "https://hpokklmjsmsjfzbuqcdl.supabase.co";
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY; // .env'den okunuyor

app.use(cors());
app.use(express.json());
// public klasöründeki statik dosyaları sunar (ör. index.html)
app.use(express.static('public'));

app.get('/api/users', async (req, res) => {
    try {
        // "users" tablosundaki tüm verileri çekiyoruz
        const response = await axios.get(`${SUPABASE_URL}/rest/v1/users`, {
            headers: {
                "apikey": SUPABASE_API_KEY,
                "Authorization": `Bearer ${SUPABASE_API_KEY}`,
                "Content-Type": "application/json"
            },
            params: {
                select: "*"
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor...`);
});
