export const queryKeys = {
  users: {
    all: ['users'] as const,
    stats: ['users', 'stats'] as const,
    profile: ['users', 'profile'] as const,
  },

  problems: {
    all: ['problems'] as const,
    set: (date: string) => [...queryKeys.problems.all, 'set', date] as const,
    solution: (problemNumber: number) =>
      [...queryKeys.problems.all, 'solution', problemNumber] as const,
  },

  auth: {
    all: ['auth'] as const,
    status: ['auth', 'status'] as const,
  },
};
