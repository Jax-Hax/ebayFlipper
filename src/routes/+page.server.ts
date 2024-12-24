import { redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const load: PageServerLoad = async ({ locals: { supabase, session } }) => {
  if (session) {
    redirect(303, '/dashboard')
  }
  const form = await superValidate(zod(authSchema));

  // Always return { form } in load functions
  return { form };
}

export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(authSchema));
    console.log(form.data.email)
    const { error } = await supabase.auth.signUp({ email: form.data.email, password: form.data.password })
    if (error) {
      console.error(error)
      redirect(303, '/auth/error')
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