import { redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types'

const vapidSchema = z.object({
  VAPIDJson: z.string()
});

export const load: PageServerLoad = async ({ locals: { session } }) => {
  if (!session) {
    redirect(303, '/')
  }
  const form = await superValidate(zod(vapidSchema));

  // Always return { form } in load functions
  return { form };
}

export const actions: Actions = {
  subscribeToPushNotifications: async ({ locals: { session, supabase }, request }) => {
    const pushNotificationsForm = await superValidate(request, zod(vapidSchema));
    if (!pushNotificationsForm.valid) {
      console.error("Push notifications not valid")
      throw redirect(302, '/auth/error')
    }
    if (!session) {
      throw redirect(302, '/')
    }
    const { data, error: error1 } = await supabase
      .from('user_data')
      .select()
      .eq('user_id', session.user.id)
      .single()
    if (error1 != null) {
      console.error(error1.message)
    }
    let pushNotificationsArr = data.notification_subscription_vapid;
    pushNotificationsArr.push(pushNotificationsForm.data.VAPIDJson)
    const { error: error2 } = await supabase
      .from('user_data')
      .update({ notification_subscription_vapid: pushNotificationsArr })
      .eq('user_id', session.user.id)
    if (error2 != null) {
      console.error(error2.message)
    }
    return { pushNotificationsForm }
  },
}