import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'alpha-sign-studio',
  title: 'Alpha Sign AG',

  projectId: 'p8qni8zq',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhalt')
          .items([
            S.listItem()
              .title('Projekte / Portfolio')
              .icon(() => '📁')
              .child(
                S.documentList()
                  .title('Projekte')
                  .filter('_type == "project"')
              ),
            S.divider(),
            S.listItem()
              .title('Dienstleistungen')
              .icon(() => '🛠️')
              .child(
                S.documentList()
                  .title('Dienstleistungen')
                  .filter('_type == "service"')
              ),
            S.listItem()
              .title('Team')
              .icon(() => '👥')
              .child(
                S.documentList()
                  .title('Team-Mitglieder')
                  .filter('_type == "teamMember"')
              ),
            S.listItem()
              .title('FAQ')
              .icon(() => '❓')
              .child(
                S.documentList()
                  .title('Häufige Fragen')
                  .filter('_type == "faq"')
              ),
            S.divider(),
            S.listItem()
              .title('Seiten')
              .icon(() => '📄')
              .child(
                S.documentList()
                  .title('Seiten')
                  .filter('_type == "page"')
              ),
            S.listItem()
              .title('Einstellungen')
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
