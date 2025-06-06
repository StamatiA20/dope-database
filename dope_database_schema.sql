
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

-- PAGE VIEWS
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES sessions(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT,
  visit_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  scroll_depth INTEGER,
  time_spent INTEGER
);

-- INTERACTIONS
CREATE TABLE interactions (
  id SERIAL PRIMARY KEY,
  page_view_id INTEGER REFERENCES page_views(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  element_selector TEXT,
  input_value TEXT,
  interaction_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BROWSER STATES
CREATE TABLE browser_states (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES sessions(id) ON DELETE CASCADE,
  state_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  open_tabs JSONB,
  scroll_positions JSONB,
  zoom_level NUMERIC,
  active_url TEXT
);

-- CONTENT SUMMARIES
CREATE TABLE content_summaries (
  id SERIAL PRIMARY KEY,
  page_view_id INTEGER REFERENCES page_views(id) ON DELETE CASCADE,
  summary TEXT,
  keywords TEXT[],
  raw_html_snippet TEXT,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_page_views_session_id ON page_views(session_id);
CREATE INDEX idx_interactions_page_view_id ON interactions(page_view_id);
