import FetchingConfigFiles from './content/api/fetching-config-files.md';

interface Category {
  name: string;
  slug: string;
  pages: {
    name: string;
    slug: string;
    description: string;
    content: object;
  }[];
}

const categories: Category[] = [
  {
    name: 'API Reference',
    slug: 'api-reference',
    pages: [
      {
        name: 'Fetching Config Files',
        slug: 'fetching-config-files',
        description: 'How to fetch config files from the API',
        content: FetchingConfigFiles,
      },
    ],
  },
];

export default categories;
