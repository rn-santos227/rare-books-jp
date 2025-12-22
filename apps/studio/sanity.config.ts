import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {deskStructure} from './deskStructure'
import {schemaTypes} from './schemaTypes'
import {dashboardPlugin} from './dashboard/dashboardTool'

export default defineConfig({
  name: 'default',
  title: 'rare-books-jp-studio',

  projectId: 'h53l3a36',
  dataset: 'production',

  plugins: [dashboardPlugin(), structureTool({structure: deskStructure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
