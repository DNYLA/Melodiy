import { SearchQuery } from '@melodiy/api';
import { SearchType } from '@melodiy/types';
import { createFileRoute, defer } from '@tanstack/react-router';
import { z } from 'zod';

const searchSchema = z.object({
  title: z.string().catch(''),
});

export const Route = createFileRoute('/search')({
  validateSearch: (search) => searchSchema.parse(search),
  loaderDeps: ({ search: { title } }) => ({ title }),
  loader: async ({ deps: { title } }) => {
    const tracks = SearchQuery(title, SearchType.All);
    return { results: defer(tracks) };
  },
});
