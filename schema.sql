CREATE TABLE IF NOT EXISTS suppliers (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(120) NOT NULL,
  contact    VARCHAR(100),
  address    TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS items (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  category    VARCHAR(80),
  price       NUMERIC(12,2) NOT NULL,
  stock       INTEGER DEFAULT 0,
  supplier_id INTEGER REFERENCES suppliers(id),
  created_at  TIMESTAMP DEFAULT NOW()
);