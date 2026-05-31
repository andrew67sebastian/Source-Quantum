import {defineField, defineType} from 'sanity'

export const authorType = defineType ({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {source: 'name'},
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            type: 'image',
        }),
        defineField({
            name: 'education',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'major',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'bio',
            type: 'array',
            of: [{type: 'block'}],
        }),
    ],
})
