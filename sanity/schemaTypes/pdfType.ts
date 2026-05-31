import {defineField, defineType} from 'sanity'

export const pdfType = defineType ({
    name: 'pdf',
    title: 'PDF',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'subtitle',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {source: 'title'},
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'tags',
            type: 'string',
        }),
        defineField({
            name: 'file',
            title: 'PDF File',
            type: 'file',
            options: {
                accept: 'application/pdf',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                accept: 'image/*',
                hotspot: true
            }
        }),
    ]
})
