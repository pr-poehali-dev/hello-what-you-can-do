
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  city TEXT DEFAULT '',
  child_age TEXT DEFAULT '',
  about TEXT DEFAULT '',
  child_name TEXT DEFAULT '',
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days'
);

CREATE TABLE notification_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  new_posts BOOLEAN DEFAULT TRUE,
  replies BOOLEAN DEFAULT TRUE,
  likes BOOLEAN DEFAULT FALSE,
  consultations BOOLEAN DEFAULT TRUE,
  stories BOOLEAN DEFAULT FALSE,
  new_members BOOLEAN DEFAULT FALSE,
  weekly_digest BOOLEAN DEFAULT TRUE,
  promo BOOLEAN DEFAULT FALSE
);

CREATE TABLE privacy_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  public_profile BOOLEAN DEFAULT TRUE,
  show_city BOOLEAN DEFAULT TRUE,
  show_child BOOLEAN DEFAULT TRUE,
  allow_messages BOOLEAN DEFAULT TRUE,
  show_online BOOLEAN DEFAULT FALSE,
  index_search BOOLEAN DEFAULT TRUE
);
