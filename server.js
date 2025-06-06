const express = require('express');
const app = express();
require('dotenv').config();

const trackingRoutes = require('./routes/tracking');

app.use(express.json());
app.use('/track', trackingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
