// server.js (Backend)

const express = require('express');
const cors = require('cors');  // Import the CORS middleware
const http = require('https');
const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post('/translate', (req, res) => {
  const textToTranslate = req.body.text;
  const targetLanguage = req.body.language || 'es'; // Default to Spanish

  const options = {
    method: 'POST',
    hostname: 'microsoft-translator-text-api3.p.rapidapi.com',
    port: null,
    path: `/largetranslate?to=${targetLanguage}&from=en`,
    headers: {
      'x-rapidapi-key': '94c3ce24f7msh7ec14cebfac4898p159831jsn8f389f4a4742',
      'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
  };

  const reqApi = http.request(options, function (apiRes) {
    const chunks = [];

    apiRes.on('data', function (chunk) {
      chunks.push(chunk);
    });

    apiRes.on('end', function () {
      const body = Buffer.concat(chunks);
      const translatedText = JSON.parse(body.toString()).text;
      res.json({ translatedText });
    });
  });

  reqApi.write(
    JSON.stringify({
      sep: '|',
      text: textToTranslate,
    })
  );
  reqApi.end();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
