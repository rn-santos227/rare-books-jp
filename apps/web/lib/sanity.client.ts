import { createClient } from '@sanity/client'

const baseConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
}

export const sanityClient = createClient({
  ...baseConfig,
  useCdn: true,
})

export const sanityWriteClient = createClient({
  ...baseConfig,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

