import page from './page'
import service from './service'
import project from './project'
import faq from './faq'
import teamMember from './teamMember'
import settings from './settings'

// Object types for reusable components
import localizedString from './objects/localizedString'
import localizedText from './objects/localizedText'
import localizedSlug from './objects/localizedSlug'
import localizedPortableText from './objects/localizedPortableText'
import seo from './objects/seo'

export const schemaTypes = [
  // Document types
  page,
  service,
  project,
  faq,
  teamMember,
  settings,

  // Object types
  localizedString,
  localizedText,
  localizedSlug,
  localizedPortableText,
  seo,
]
