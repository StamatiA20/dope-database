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

// Create window
router.post('/windows', async (req, res) => {
  const { sessionId, opened, closed } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO windows (session_id, opened, closed) VALUES ($1, $2, $3) RETURNING id`,
      [sessionId, opened, closed]
    );
    res.json({ windowId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create window event
router.post('/window-event', async (req, res) => {
  const { windowId, eventType, eventDescription } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO window_event (window_id, event_type, event_description) VALUES ($1, $2, $3) RETURNING id`,
      [windowId, eventType, eventDescription]
    );
    res.json({ windowEventId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create page event
router.post('/page-event', async (req, res) => {
  const { tabUuid, windowId, eventType, eventDescription, url, timestamp } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO page_event (tab_uuid, window_id, event_type, event_description, url, timestamp) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [tabUuid, windowId, eventType, eventDescription, url, timestamp]
    );
    res.json({ pageEventId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create content summary
router.post('/content-summary', async (req, res) => {
  const { pageId, summary, keywords, rawHtmlSnippet, generatedAt } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO content_summaries (page_id, summary, keywords, raw_html_snippet, generated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [pageId, summary, keywords, rawHtmlSnippet, generatedAt]
    );
    res.json({ contentSummaryId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;