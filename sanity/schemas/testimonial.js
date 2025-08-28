export default {
  name: 'clientFeedback',
  title: 'Client Feedback',
  type: 'document',
  fields: [
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      validation: Rule => Rule.required()
    },
    {
      name: 'companyWebsite',
      title: 'Company Website URL',
      type: 'url',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https']
      }),
      description: 'Client company website (include https://)'
    },
    {
      name: 'testimonialScreenshot',
      title: 'Testimonial Screenshot',
      type: 'image',
      validation: Rule => Rule.required(),
      description: 'WhatsApp, Email, or document screenshot'
    },
    {
      name: 'displayOrder',
      title: 'Display Order (1-9)',
      type: 'number',
      validation: Rule => Rule.min(1).max(9)
    }
  ],
  preview: {
    select: {
      title: 'companyName',
      media: 'companyLogo',
      subtitle: 'displayOrder'
    },
    prepare(selection) {
      const {title, media, subtitle} = selection
      return {
        title: title,
        media: media,
        subtitle: `Position: ${subtitle || 'Not set'}`
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [
        {field: 'displayOrder', direction: 'asc'}
      ]
    },
    {
      title: 'Company Name',
      name: 'companyNameAsc',
      by: [
        {field: 'companyName', direction: 'asc'}
      ]
    }
  ]
}
