import { supabase } from '../lib/supabase';

export const registerUser = async (userId: string, password: string) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([{ userid:userId, password }])
            .select()
            .single();
        const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .insert([{ userid:userId  }])
                .select()
            .single();
        return { data, error, profileData, profileError };
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (userId: string, password: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('userId', userId)
    .eq('password', password)
    .single();

  return { user: data, error };
};
