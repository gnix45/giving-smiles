-- Giving Smiles Everyday: Supabase Database Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT CHECK (role IN ('patient', 'doctor', 'admin')) DEFAULT 'patient',
  full_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Appointments (Public Booking Form Data)
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  status TEXT DEFAULT 'pending', -- pending, confirmed, completed
  assigned_doctor UUID REFERENCES public.profiles(id),
  patient_id UUID REFERENCES public.profiles(id),
  
  -- Personal Info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  emergency_contact JSONB, -- { name, phone, relationship }
  
  -- Medical Info
  organ_needed TEXT NOT NULL,
  blood_type TEXT NOT NULL,
  diagnosis TEXT,
  duration_of_condition TEXT,
  previous_transplant BOOLEAN DEFAULT FALSE,
  previous_transplant_details TEXT,
  medications TEXT,
  allergies TEXT,
  dialysis_status BOOLEAN DEFAULT FALSE,
  
  -- Medical History
  pre_existing_conditions JSONB, -- Array of strings
  previous_surgeries TEXT,
  treating_hospital TEXT,
  referring_physician TEXT,
  insurance_provider TEXT,
  insurance_policy_number TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Patients (Extended Medical Data for actual registered patients)
CREATE TABLE IF NOT EXISTS public.patients (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  blood_type TEXT,
  organ_needed TEXT,
  diagnosis TEXT,
  medical_history JSONB,
  medications TEXT,
  allergies TEXT,
  insurance TEXT,
  dialysis_status BOOLEAN DEFAULT FALSE,
  emergency_contact JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Waitlist
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  organ_type TEXT NOT NULL,
  priority_tier TEXT DEFAULT 'Standard',
  position INTEGER,
  estimated_wait TEXT,
  match_percentage INTEGER,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Matches
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  donor_id TEXT, -- Might be external ID so TEXT
  organ_type TEXT NOT NULL,
  confidence INTEGER,
  hla_typing TEXT,
  distance TEXT,
  urgency TEXT,
  status TEXT DEFAULT 'Evaluating',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Medical Records (File uploads)
CREATE TABLE IF NOT EXISTS public.medical_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_by UUID REFERENCES public.profiles(id),
  record_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Fleet Units (Logistics)
CREATE TABLE IF NOT EXISTS public.fleet_units (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  unit_id TEXT UNIQUE NOT NULL,
  type TEXT,
  status TEXT DEFAULT 'Available',
  destination TEXT,
  cargo TEXT,
  temperature TEXT,
  eta TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Messages (Realtime Chat)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  conversation_id TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

--- RLS POLICIES ---

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fleet_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- VERY PERMISSIVE POLICIES FOR DEMO PROTOTYPE --
-- In a real HIPAA app, these would be strictly scoped to `auth.uid() = id`, etc.
-- But since there is no server-side admin set up completely yet, we will allow authenticated users broader access and public users insert access where needed.

-- Profiles: Anyone can read profiles. Authenticated users can update.
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Appointments: Public can insert (Booking Form). Authenticated docs can read routing.
CREATE POLICY "Anyone can insert appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read appointments" ON public.appointments FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update appointments" ON public.appointments FOR UPDATE USING (auth.role() = 'authenticated');

-- Patients/Waitlist/Matches/Records/Fleet: Allow all authenticated
CREATE POLICY "Auth reads patients" ON public.patients FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth inserts patients" ON public.patients FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth updates patients" ON public.patients FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth reads waitlist" ON public.waitlist FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth inserts waitlist" ON public.waitlist FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth updates waitlist" ON public.waitlist FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth reads matches" ON public.matches FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth reads records" ON public.medical_records FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth reads fleet" ON public.fleet_units FOR SELECT USING (auth.role() = 'authenticated');

-- Messages: Users can only see messages where they are sender or receiver
CREATE POLICY "Users can read their messages" ON public.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update their messages" ON public.messages FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Tell PostgREST to reload the schema cache so the tables are instantly available
NOTIFY pgrst, 'reload schema';
