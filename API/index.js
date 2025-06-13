const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/cep/:cep', async (req, res) => {
  const { cep } = req.params;
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      return res.status(404).json({ error: 'CEP not found' });
    }
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching CEP data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
