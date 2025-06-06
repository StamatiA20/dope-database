const express = require('express');
const router = express.Router();
const db = require('../db');

// Create or find user
router.post('/user', async (req, res) => {
  const { uuid } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO users (uuid) 
       VALUES ($1) 
       ON CONFLICT (uuid) DO UPDATE SET uuid = EXCLUDED.uuid 
       RETURNING id`,
      [uuid]
    );
    res.json({ userId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create session
router.post('/session', async (req, res) => {
  const { userId, sessionId } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO sessions (user_id, session_id) VALUES ($1, $2) RETURNING id`,
      [userId, sessionId]
    );
    res.json({ sessionId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Track page view
router.post('/page-view', async (req, res) => {
  const { sessionId, url, title, scrollDepth, timeSpent } = req.body;
  try {
    await db.query(
      `INSERT INTO page_views (session_id, url, title, scroll_depth, time_spent) 
       VALUES ($1, $2, $3, $4, $5)`,
      [sessionId, url, title, scrollDepth, timeSpent]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Track interaction
router.post('/interaction', async (req, res) => {
  const { pageViewId, eventType, elementSelector, inputValue } = req.body;
  try {
    await db.query(
      `INSERT INTO interactions (page_view_id, event_type, element_selector, input_value) 
       VALUES ($1, $2, $3, $4)`,
      [pageViewId, eventType, elementSelector, inputValue]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;