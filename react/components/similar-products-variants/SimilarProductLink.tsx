import React from 'react'
import { Link } from 'vtex.render-runtime'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

interface SimilarProductLinkProps {
  itemSimilarLink: SimilarLink
  isSelected: boolean
  variation: string
}

const SimilarProductLink = ({
  itemSimilarLink,
  isSelected,
  variation,
}: SimilarProductLinkProps) => {
  const handles = useCssHandles([
    'variantImageLink',
    'variantLabelLink',
    'variantImage',
  ])

  if (variation === 'Cor') {
    return (
      <Link
        page="store.product"
        params={{
          slug: itemSimilarLink.linkText,
        }}
        className={`${applyModifiers(
          handles.variantImageLink,
          isSelected ? 'selectedProduct' : ''
        )} mr3-s mr1-m mb3`}
      >
        <img
          src={itemSimilarLink.items[0].images[0].imageUrl}
          width="32"
          height="32"
          alt={itemSimilarLink.productName}
          className={`${applyModifiers(
            handles.variantImage,
            isSelected ? 'selectedProduct' : ''
          )} pa1 br2 ba`}
        />
      </Link>
    )
  }
  return null
}

export default SimilarProductLink
