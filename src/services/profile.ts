import { supabase } from "../lib/supabase";


export const getProfileByUserId = async (userid: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('userid', userid)
        .single();
    return { data, error };
};


export const updateProfileByUserId = async (userid: string, values: any) => {
    const { data, error } = await supabase
      .from("profiles")
      .update(values)
      .eq("userid", userid)
      .select()
      .single();
  
    return { profile: data, error };
  };