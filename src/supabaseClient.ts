import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://bliydtpehtrxsasmblyh.supabase.co'
const supabaseAnonKey = 'sb_publishable_mR18MPvAUCWV4izvOvtcsw_0Prmdp06'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
