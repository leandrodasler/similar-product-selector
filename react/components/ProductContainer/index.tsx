import React from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import ProductLink from '../ProductLink'

interface IProps {
  variationType: VariationType
  products: Product[]
  selectedProduct: Product
}

const CSS_HANDLES = [
  'productsContainer',
  'productsContainerTitle',
  'productsContainerList',
]

function ProductsContainer(props: IProps) {
  const handles = useCssHandles(CSS_HANDLES)
  const { variationType, products, selectedProduct } = props

  const allProducts = products.reduce((acc: SimilarProduct[], cur) => {
    const property = cur.properties?.find((p) => p.name === variationType.name)
    const hasExistProduct = acc.some((product) => {
      return product.properties?.some(
        (prodP) => prodP.values[0] === property?.values[0]
      )
    })

    if (property && !hasExistProduct) {
      return [...acc, cur]
    }

    return acc
  }, [])

  if (allProducts.length === 0) {
    return null
  }

  return (
    <div
      className={`${applyModifiers(
        handles.productsContainer,
        variationType.type
      )} dib w-100-s w-auto-m mr8-m`}
    >
      <div
        className={`${handles.productsContainerTitle} pb2 f6-m f7-s lh-solid`}
      >
        {`${variationType.name}: ${
          selectedProduct.properties.find((v) => v.name === variationType.name)
            ?.values[0]
        }`}
      </div>

      <div className={`${handles.productsContainerList} flex flex-wrap`}>
        {allProducts.map((item) => (
          <ProductLink
            key={item.productId}
            similarProduct={item}
            isSelected={item.productId === selectedProduct.productId}
            variation={variationType.type}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductsContainer
