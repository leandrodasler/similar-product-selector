import React, { useContext } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useQuery } from 'react-apollo'
import { ProductContext } from 'vtex.product-context'

import SimilarProductContainer from './SimilarProductsContainer'
import GET_PRODUCT_VARIANTS from './GET_PRODUCT_VARIANTS.gql'

const CSS_HANDLES = ['varianteMainContainer']

function SimilarProductsVariants() {
  const handles = useCssHandles(CSS_HANDLES)

  const { product }: any = useContext(ProductContext)
  const { data, error } = useQuery<
    RecommendationQuery,
    ProductVariantsVariables
  >(GET_PRODUCT_VARIANTS, {
    variables: {
      identifier: { field: 'id', value: product?.productId },
    },
  })

  if (!data) {
    if (error) {
      console.log(error)
      return null
    } else {
      return null
    }
  }

  const { product: productRecommendations }: any = data
  const variationTypes: VariationType[] = [
    { type: 'Cor', name: 'Cor' }
  ]
  return (
    <div className={`${handles.varianteMainContainer} flex-m flex-wrap db-s`}>
      {productRecommendations
        ? variationTypes.map(variationType => {
            return (
              <SimilarProductContainer
                variationType={variationType}
                productRecommendations={[
                  product,
                  ...productRecommendations.recommendations.similars,
                ]}
                selectedProduct={product}
              />
            )
          })
        : null}
    </div>
  )
}

export default SimilarProductsVariants
