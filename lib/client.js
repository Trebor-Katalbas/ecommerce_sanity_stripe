import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'zoizhltn',
  dataset: 'production',
  apiVersion: '2024-05-31',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) {
    console.error('Source is undefined');
    return '';
  }
  return builder.image(source).url();
};
