-- USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  uuid TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SESSIONS
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT UNIQUE NOT NULL,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP
);

-- WINDOWS
CREATE TABLE windows (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES sessions(id) ON DELETE CASCADE,
  opened TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  closed TIMESTAMP
);

-- WINDOW_EVENT
CREATE TABLE window_event (
  id SERIAL PRIMARY KEY,
  window_id INTEGER REFERENCES windows(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_description TEXT
);

-- PAGE_EVENT
CREATE TABLE page_event (
  id SERIAL PRIMARY KEY,
  tab_uuid TEXT NOT NULL,
  window_id INTEGER REFERENCES windows(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_description TEXT,
  url TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CONTENT_SUMMARIES
CREATE TABLE content_summaries (
  id SERIAL PRIMARY KEY,
  page_id INTEGER REFERENCES page_event(id) ON DELETE CASCADE,
  summary TEXT,
  keywords TEXT[],
  raw_html_snippet TEXT,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
