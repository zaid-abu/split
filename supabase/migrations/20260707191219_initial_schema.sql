CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  phone text,
  email text,
  default_currency text DEFAULT 'USD',
  locale text,
  onboarding_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE friendships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  addressee_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status text CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text CHECK (type IN ('trip', 'home', 'couple', 'event', 'other')),
  icon text,
  cover_url text,
  default_currency text,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  archived_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES groups(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role text CHECK (role IN ('admin', 'member')),
  status text CHECK (status IN ('invited', 'active', 'removed', 'left')),
  joined_at timestamptz DEFAULT now()
);

CREATE TABLE expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES groups(id) ON DELETE CASCADE,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  paid_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  title text NOT NULL,
  amount numeric NOT NULL,
  currency text NOT NULL,
  category text,
  expense_date date,
  notes text,
  receipt_url text,
  split_method text CHECK (split_method IN ('equal', 'percentage', 'shares', 'exact', 'adjustment')),
  version integer DEFAULT 1,
  deleted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE expense_splits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_id uuid REFERENCES expenses(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  owed_amount numeric NOT NULL,
  percentage numeric,
  shares numeric,
  adjustment_amount numeric
);

CREATE TABLE settlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES groups(id) ON DELETE CASCADE,
  payer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  currency text NOT NULL,
  method text CHECK (method IN ('cash', 'bank', 'upi', 'stripe', 'paypal', 'venmo', 'other')),
  status text CHECK (status IN ('recorded', 'processing', 'completed', 'failed')),
  note text,
  settled_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  group_id uuid REFERENCES groups(id) ON DELETE CASCADE,
  expense_id uuid REFERENCES expenses(id) ON DELETE SET NULL,
  settlement_id uuid REFERENCES settlements(id) ON DELETE SET NULL,
  type text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_id uuid REFERENCES expenses(id) ON DELETE CASCADE,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  body text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text CHECK (type IN ('reminder', 'friend_request', 'payment', 'invite', 'activity')),
  title text,
  body text,
  metadata jsonb,
  read_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE recurring_expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES groups(id) ON DELETE CASCADE,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  template jsonb,
  frequency text CHECK (frequency IN ('weekly', 'monthly', 'yearly', 'custom')),
  next_run_at timestamptz,
  active boolean DEFAULT true
);
