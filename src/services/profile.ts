import { supabase } from "../lib/supabase";

type Profile = {
    userid: string;
    salutation?: string;
    firstName?: string;
    lastName?: string;
    maritalStatus?: string;
    country?: string;
    hobbies?: string[];
    favoriteSports?: string[];
    favoriteMusicGenres?: string[];
    preferredMovies?: string[];
};
export const getProfileByUserId = async (userid: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('userid', userid)
        .single();
    return { data, error };
};

export const updateProfile = async (profile: Profile) => {
    const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('userid', profile.userid)
        .select()
        .single();
    return { data, error };
};
