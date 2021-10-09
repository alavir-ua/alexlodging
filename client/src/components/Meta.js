import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords, style }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <style>{style}</style>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Alex Lodging',
  description: 'The best rooms at the lowest price',
  keywords: 'rooms, booking, travel',
}

export default Meta
