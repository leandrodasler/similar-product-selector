import React from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import SimilarProductLink from './SimilarProductLink'

const CSS_HANDLES = [
  'varianteContainer',
  'varianteContainerName',
  'varianteContainerLink',
]

interface Props {
  variationType: VariationType
  productRecommendations: Product[]
  selectedProduct: Product
}

function SimilarProductContainer(props: Props) {
  const handles = useCssHandles(CSS_HANDLES)

  const { variationType, productRecommendations, selectedProduct } = props

  const allProducts = productRecommendations.reduce(
    (initial: SimilarLink[], product) => {
      const property = product.properties?.find(
        property => property.name === variationType.type
      )
      if (
        property &&
        !initial.some(product =>
          product.properties.some(
            prodProperty => property.values[0] === prodProperty.values[0]
          )
        )
      ) {
        return [...initial, product]
      }
      return initial
    },
    []
  )

  return allProducts.length !== 0 ? (
    <div
      className={`${applyModifiers(
        handles.varianteContainer,
        variationType.type
      )} dib w-100-s w-auto-m mr8-m`}
    >
      <div
        className={`${handles.varianteContainerName} pb2 f6-m f7-s lh-solid`}
      >
        {variationType.name}:{' '}
        {
          selectedProduct.properties.find(
            (variation: any) => variation.name === variationType.name
          )?.values[0]
        }
      </div>
      <div className={`${handles.varianteContainerLink} flex flex-wrap`}>
        {allProducts.map((recommendedProduct: SimilarLink) => {
          return (
            <SimilarProductLink
              itemSimilarLink={recommendedProduct}
              isSelected={
                recommendedProduct.productId === selectedProduct.productId
              }
              variation={variationType.type}
            />
          )
        })}
      </div>
    </div>
  ) : null
}

export default SimilarProductContainer
