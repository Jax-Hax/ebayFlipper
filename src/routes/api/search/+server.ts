export async function POST({ request, locals }) {
    const { search_name } = await request.json();

    const session = await locals.getSession()
    let updated_assignment_array = JSON.parse(assignment_array)
    await updated_assignment_array.forEach(async (assignment: { is_custom: any; assignment_id: any; reference_id: any; }) => {
        if (assignment.is_custom) {
            const { error } = await locals.supabase
                .from('custom_todos')
                .update({ reference_id: assignment.reference_id })
                .eq("assignment_id", assignment.assignment_id)
                .eq("user_id", session.user.id)
            if (error != null) {
                console.error(error.message)
            }
        }
        else {
            const { error } = await locals.supabase
                .from('users_canvas_assignments')
                .update({ reference_id: assignment.reference_id })
                .eq("assignment_id", assignment.assignment_id)
                .eq("user_id", session.user.id)
            if (error != null) {
                console.error(error.message)
            }
        }
    })
    return new Response(JSON.stringify({ message: "Some Message" }), { status: 200 })
}