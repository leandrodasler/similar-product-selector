import React, { useContext } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useQuery } from 'react-apollo'
import { ProductContext } from 'vtex.product-context'

import ProductsContainer from './components/ProductContainer'
import GET_PRODUCT_VARIANTS from './graphql/GET_PRODUCT_VARIANTS.gql'

const CSS_HANDLES = ['similarProductsSelector']

function SimilarProductsSelector() {
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

  if (!data || error) {
    return null
  }

  const { product: productRecommendations }: any = data
  const variationTypes: VariationType[] = [{ type: 'Cor', name: 'Cor' }]

  return (
    <div className={`${handles.similarProductsSelector} flex-m flex-wrap db-s`}>
      {productRecommendations &&
        variationTypes.map((variation) => (
          <ProductsContainer
            key={`product-${variation.name}`}
            variationType={variation}
            products={[
              product,
              ...productRecommendations.recommendations.similars,
            ]}
            selectedProduct={product}
          />
        ))}
    </div>
  )
}

export default SimilarProductsSelector
