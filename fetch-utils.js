const SUPABASE_URL = 'https://cugbcofvobrtranzaycv.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1Z2Jjb2Z2b2JydHJhbnpheWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyOTQ3MTAsImV4cCI6MTk3OTg3MDcxMH0.xCDgB_VrvVOssr-xnhoZpEi0uyvXVf8ZXxpCG73jilE';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

export async function createItem(item) {
    return await client.from('shopping_list').insert(item).single();
}

export async function getItem() {
    return await client.from('shopping_list').select('*').order('created_at');
}

export async function boughtItem(id) {
    return await client.from('shopping_list').update({ bought: true }).eq('id', id).single();
}
