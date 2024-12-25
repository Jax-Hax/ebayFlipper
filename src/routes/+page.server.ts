import { redirect } from '@sveltejs/kit'
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const load: PageServerLoad = async ({ locals: { supabase, session } }) => {
  let loggedIn = session ? true : false;
  const form = await superValidate(zod(authSchema));

  // Always return { form } in load functions
  return { form, loggedIn };
}

export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(authSchema));
    if (!form.valid) {
      return fail(400, { form });
    }
    const { error } = await supabase.auth.signUp({ email: form.data.email, password: form.data.password })
    if (error) {
      console.error(error)
      return setError(form, 'email', 'Server error. Please retry or contact support.');
    } else {
      redirect(303, '/auth/signup')
    }
  },
  login: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(authSchema));
    const { error } = await supabase.auth.signInWithPassword({ email: form.data.email, password: form.data.password })
    if (error) {
      console.error(error)
      redirect(303, '/auth/error')
    } else {
      redirect(303, '/dashboard')
    }
  },
}