import React from 'react'
import { Link } from 'vtex.render-runtime'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import './style.css'

interface ProductLinkProps {
  similarProduct: SimilarProduct
  isSelected: boolean
  variation: string
}

const CSS_HANDLES: string[] = ['productLink', 'productLinkImage']

function ProductLink(props: ProductLinkProps) {
  const handles = useCssHandles(CSS_HANDLES)

  if (props.variation !== 'Cor') {
    return null
  }

  return (
    <Link
      page="store.product"
      params={{ slug: props.similarProduct.linkText }}
      className={`${applyModifiers(
        handles.productLink,
        props.isSelected ? 'selected' : ''
      )} mr3-s mr1-m mb3`}
    >
      <img
        src={props.similarProduct.items[0].images[0].imageUrl}
        width="32"
        height="32"
        alt={props.similarProduct.productName}
        className={`${applyModifiers(
          handles.productLinkImage,
          props.isSelected ? 'selected' : ''
        )} pa1 br2 ba`}
      />
    </Link>
  )
}

export default ProductLink
