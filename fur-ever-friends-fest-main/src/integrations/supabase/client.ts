// Supabase integration removed per request.
// To keep the codebase stable, we export a harmless stub instead of the real client.
// This prevents accidental use of embedded keys and removes Supabase functionality.

// If you later want to re-enable Supabase, restore the real client here and
// provide credentials via environment variables instead of in-source values.

export const supabase = {
  // Minimal stubbed methods. All operations are no-ops that return resolved promises.
  from: (_: string) => ({
    select: async () => ({ data: null, error: null }),
    insert: async () => ({ data: null, error: null }),
    update: async () => ({ data: null, error: null }),
    delete: async () => ({ data: null, error: null }),
  }),
  auth: {
    signIn: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
    user: () => null,
  },
  rpc: async () => ({ data: null, error: null }),
};