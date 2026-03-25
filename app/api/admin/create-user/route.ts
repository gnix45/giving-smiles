import { NextResponse } from 'next/server';
import { createAdminClient, createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient();
    
    // 1. Verify caller is a doctor/admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'doctor' && profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 2. Extract patient data
    const body = await request.json();
    const { 
      email, 
      password, 
      fullName, 
      role,
      appointmentId,
      organNeeded,
      bloodType,
      diagnosis,
      allergies,
      medications,
      insurance,
      priorityTier,
      dialysisStatus,
      emergencyContact
    } = body;

    // 3. Use Admin Client to create user (bypasses email confirmation)
    const adminAuthClient = await createAdminClient();
    
    const { data: patientUser, error: createError } = await adminAuthClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role: role
      }
    });

    if (createError) throw createError;

    // The trigger 'handle_new_user' auto-creates the profile and empty patient row.
    // So we just need to UPDATE the patients table, and INSERT into waitlist.

    if (patientUser?.user) {
      const patientId = patientUser.user.id;

      // Update patient medical record
      await adminAuthClient.from('patients').update({
        blood_type: bloodType,
        organ_needed: organNeeded,
        diagnosis: diagnosis,
        allergies: allergies,
        medications: medications,
        insurance_provider: insurance,
        dialysis_status: dialysisStatus,
        emergency_contact: emergencyContact
      }).eq('profile_id', patientId);

      // Create waitlist entry
      await adminAuthClient.from('waitlist').insert({
        patient_id: patientId,
        organ_type: organNeeded || 'Unknown',
        priority_tier: priorityTier,
        status: 'active',
        match_percentage: 0
      });

      // Update Appointment status to confirmed
      if (appointmentId) {
        await adminAuthClient.from('appointments').update({
          status: 'confirmed',
          patient_id: patientId,
          assigned_doctor_id: user.id
        }).eq('id', appointmentId);
      }
    }

    return NextResponse.json({ success: true, userId: patientUser?.user?.id });
  } catch (error: any) {
    console.error('Admin Create User Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Helper to get standard server client
async function createServerClient() {
  const client = await createClient();
  return client;
}
