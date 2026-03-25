-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null check (role in ('patient', 'doctor', 'admin')),
  full_name text,
  email text,
  phone text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- APPOINTMENTS (Public Booking -> Clinical Dashboard)
create table public.appointments (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.profiles(id) on delete set null, -- Nullable until account created
  assigned_doctor_id uuid references public.profiles(id) on delete set null,
  
  -- Public Booking Form Data
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  date_of_birth date not null,
  gender text not null,
  address text,
  city text,
  state text,
  zip_code text,
  emergency_contact text,
  
  -- Medical Booking Data
  organ_needed text not null,
  blood_type text not null,
  diagnosis text,
  medications text,
  allergies text,
  dialysis_status boolean default false,
  insurance_provider text,
  medical_history text, -- JSON or text summary of checkboxes
  
  -- Appointment Metadata
  appointment_date timestamp with time zone,
  location text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PATIENTS (Extended clinical data)
create table public.patients (
  profile_id uuid references public.profiles(id) on delete cascade primary key,
  blood_type text,
  organ_needed text,
  diagnosis text,
  medical_history text,
  medications text,
  allergies text,
  insurance_provider text,
  dialysis_status boolean default false,
  emergency_contact text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- WAITLIST
create table public.waitlist (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.profiles(id) on delete cascade not null,
  organ_type text not null,
  priority_tier text not null default 'Standard', -- e.g., Tier 1-A, Standard
  position integer,
  estimated_wait_months integer,
  match_percentage integer default 0,
  status text not null default 'active' check (status in ('active', 'on_hold', 'matched', 'transplanted')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MATCHES
create table public.matches (
  id text primary key, -- Custom ID like 'RC-88219'
  patient_id uuid references public.profiles(id) on delete cascade not null,
  donor_id text, -- Assuming external donor system for now
  organ_type text not null,
  confidence integer not null,
  hla_typing text not null,
  distance_miles numeric not null,
  urgency text not null check (urgency in ('Standard', 'High', 'Critical')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'completed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MEDICAL RECORDS
create table public.medical_records (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  file_url text not null,
  record_type text not null,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- FLEET LOGISTICS
create table public.fleet_units (
  unit_id text primary key, -- e.g., 'UNIT-TX-442'
  type text not null check (type in ('Ground', 'Aerial')),
  status text not null check (status in ('Standby', 'En Route', 'In Transit', 'Maintenance')),
  destination text,
  cargo text,
  temperature text,
  eta text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MESSAGES (Chat)
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  read_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES (Row Level Security)
-- Note: In a real production app, these would be more strictly cordoned off.
-- For this prototype, we'll keep it simple:

alter table public.profiles enable row level security;
alter table public.appointments enable row level security;
alter table public.patients enable row level security;
alter table public.waitlist enable row level security;
alter table public.matches enable row level security;
alter table public.medical_records enable row level security;
alter table public.fleet_units enable row level security;
alter table public.messages enable row level security;

-- PROFILES: Users can read their own, doctors can read all
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Doctors can view all profiles" on profiles for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('doctor', 'admin'))
);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- APPOINTMENTS: Public can insert, users can view own, doctors can view/update all
create policy "Public can insert appointments" on appointments for insert with check (true);
create policy "Patients can view own appointments" on appointments for select using (auth.uid() = patient_id);
create policy "Doctors can view all appointments" on appointments for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('doctor', 'admin'))
);
create policy "Doctors can update appointments" on appointments for update using (
  exists (select 1 from profiles where id = auth.uid() and role in ('doctor', 'admin'))
);

-- PATIENTS, WAITLIST, MEDICAL RECORDS: Patient can view own, Doctor can view/edit all
create policy "Patients can view own extended info" on patients for select using (auth.uid() = profile_id);
create policy "Patients can update own extended info" on patients for update using (auth.uid() = profile_id);
create policy "Doctors have full access to patients" on patients for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('doctor', 'admin'))
);

create policy "Patients can view own waitlist" on waitlist for select using (auth.uid() = patient_id);
create policy "Doctors have full access to waitlist" on waitlist for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('doctor', 'admin'))
);

create policy "Patients can view own records" on medical_records for select using (auth.uid() = patient_id);
create policy "Doctors have full access to records" on medical_records for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('doctor', 'admin'))
);

-- MATCHES, FLEET: Doctors only
create policy "Doctors have full access to matches" on matches for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('doctor', 'admin'))
);
create policy "Doctors have full access to fleet" on fleet_units for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('doctor', 'admin'))
);

-- MESSAGES: Sender or receiver can view
create policy "Users can view participating messages" on messages for select using (
  auth.uid() = sender_id or auth.uid() = receiver_id
);
create policy "Users can send messages" on messages for insert with check (
  auth.uid() = sender_id
);

-- FUNCTION: Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', coalesce(new.raw_user_meta_data->>'role', 'patient'));
  
  -- Create empty patient record
  insert into public.patients (profile_id) values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

-- TRIGGER: Call function on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
