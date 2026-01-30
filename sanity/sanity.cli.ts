import { defineCliConfig } from 'sanity/cli'

// Get projectId from environment variable or use placeholder
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: 'alpha-sign-studio',
})
