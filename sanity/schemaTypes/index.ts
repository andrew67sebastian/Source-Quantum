import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { authorType } from './author'
import { pdfType } from './pdfType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, authorType, pdfType],
}
