import { supabase } from '../lib/supabase';

export const registerUser = async (userid: string, password: string) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([{ userid:userid, password }])
            .select()
            .single();
        const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .insert([{ userid:userid  }])
                .select()
            .single();
        return { data, error, profileData, profileError };
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (userid: string, password: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('userid', userid)
    .eq('password', password)
    .single();

  return { user: data, error };
};
