interface VariationType {
  type: string
  name: string
}

interface Installment {
  Value: number
  NumberOfInstallments: number
  InterestRate: number
  Name: string
  PaymentSystemName: string
  TotalValuePlusInterestRate: number
}

interface CommertialOffer {
  Installments: Installment[]
  Price: number
  spotPrice: number
  taxPercentage: number
  ListPrice: number
  AvailableQuantity: number
}

interface Seller {
  sellerId: string
  sellerName: string
  sellerDefault: boolean
  commertialOffer: CommertialOffer
}

interface Sku {
  name: string
  itemId: string
  images: Image[]
  image: Image
  measurementUnit: string
  unitMultiplier: number
  sellers: Seller[]
  seller: Seller
}

interface ProductProperties {
  name: string
  values: string[]
}

interface SimilarProduct {
  productId: string
  items: SKU[]
  productName: string
  linkText: string
  properties: ProductProperties[]
}

interface ProductProperties {
  name: string
  values: string[]
}

interface ProductClusters {
  id: string
  name: string
}

interface Product {
  productId: string
  productName: string
  brand: string
  categories: string[]
  linkText: string
  otherLink?: string
  items: SKU[]
  priceRange: PriceRange
  sku: SKU
  properties: ProductProperties[]
  productClusters: ProductCluster[]
  categoryTree: ProductCluster[]
}

interface ProductVariantsVariables {
  identifier: {
    field: string
    value: any
  }
}

interface RecommendationQuery {
  recommendation: Recommendation
}

interface Recommendation {
  id: string
  name: string
  price: number
  oldPrice: number
  url: string
  images: Images
  brand: string
  installment?: Installment
  status: string
  categories: Category[]
  details: any
  skus: []
  trackingUrl: string
}
