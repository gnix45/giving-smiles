import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const statuses = ['evaluating', 'Evaluating', 'pending', 'Pending', 'active', 'Active'];
const urgencies = ['Standard', 'standard', 'normal', 'Normal'];

async function run() {
  for (const status of statuses) {
    for (const urgency of urgencies) {
      const { data, error } = await supabase.from('matches').insert({
        id: crypto.randomUUID(),
        patient_id: crypto.randomUUID(), // fake
        organ_type: 'Kidney',
        confidence: 75,
        status: status,
        urgency: urgency,
        hla_typing: 'HLA-TEST',
        distance_miles: 50
      }).select();
      
      if (!error) {
        console.log(`✅ SUCCESS! status: '${status}', urgency: '${urgency}'`);
        return; // found the right combination
      } else {
        if (error.message.includes('matches_status_check')) {
            // we know it's a status check error
        } else {
            console.log(`❌ Other error for ${status}/${urgency}:`, error.message);
        }
      }
    }
  }
  console.log("No combinations worked.");
}

run();
