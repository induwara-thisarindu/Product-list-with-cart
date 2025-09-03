import ProductCard from "./ProductCard"
import type { CartItem } from "../App"
import products from "../../data.json"

type ProductItemsProps = {
  addToCart: (item: CartItem) => void
  increaseQty: (id: number) => void
  decreaseQty: (id: number) => void
  deleteFromCart: (id: number) => void
  cartItems: CartItem[]
}

const ProductItems = ({
  addToCart,
  increaseQty,
  decreaseQty,
  deleteFromCart,
  cartItems
}: ProductItemsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          {...product}
          addToCart={addToCart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          deleteFromCart={deleteFromCart}
          quantity={cartItems.find(ci => ci.id === product.id)?.quantity || 0}
        />
      ))}
    </div>
  )
}

export default ProductItems
