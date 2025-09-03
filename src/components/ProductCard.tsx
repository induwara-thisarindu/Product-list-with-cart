import type { CartItem } from "../App"

type ProductProps = {
  name: string
  category: string
  price: number
  image: {
    thumbnail: string
    mobile: string
    tablet: string
    desktop: string
  }
  addToCart: (item: CartItem) => void
  increaseQty: (id: number) => void
  decreaseQty: (id: number) => void
  deleteFromCart: (id: number) => void
  quantity: number
  id: number
}

const ProductCard = ({
  category,
  name,
  price,
  image,
  addToCart,
  increaseQty,
  decreaseQty,
  quantity,
  id
}: ProductProps) => {
  const handleAddToCart = () => {
    addToCart({ id, name, price, quantity: 1, image })
  }

  return (
    <div
      className="rounded-2xl w-full max-w-xs mx-auto flex flex-col items-center overflow-hidden"
      style={{
        backgroundImage: "url('../../assets/images/card-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#ffffff"
      }}
    >
      <picture className="w-full">
        <source media="(min-width:1024px)" srcSet={image.desktop} />
        <source media="(min-width:768px)" srcSet={image.tablet} />
        <source media="(min-width:680px)" srcSet={image.mobile} />
        <img
          src={image.thumbnail}
          alt={name}
          className="rounded-t-2xl w-full object-cover"
        />
      </picture>
      <div className="w-full flex flex-col items-start px-4 pb-4 pt-2">
        {quantity > 0 ? (
          <div className="flex items-center justify-center w-full -mt-7 mb-3">
            <div className="flex items-center justify-between bg-orange-600 text-white rounded-full px-6 py-2 w-full max-w-[220px] border border-orange-600">
              <button
                onClick={() => decreaseQty(id)}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-orange-700 transition"
                aria-label="Decrease"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <rect x="5" y="11" width="14" height="2" rx="1" fill="currentColor"/>
                </svg>
              </button>
              <span className="font-bold text-lg">{quantity}</span>
              <button
                onClick={() => increaseQty(id)}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-orange-700 transition"
                aria-label="Increase"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <rect x="11" y="5" width="2" height="14" rx="1" fill="currentColor"/>
                  <rect x="5" y="11" width="14" height="2" rx="1" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 bg-white border border-orange-400 text-orange-600 px-4 py-2 rounded-full font-medium shadow hover:cursor-pointer transition -mt-7 mb-3 self-center"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <img src="../../assets/images/icon-add-to-cart.svg" alt="Add to Cart" className="w-5 h-5"/>
            <p className="text-xl text-black">Add to Cart</p>
          </button>
        )}
        <span className="text-gray-500 text-sm mb-1">{category}</span>
        <h2 className="font-bold text-gray-800 mb-1 text-xl">{name}</h2>
        <span className="text-red-600 text-base font-semibold">${price.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default ProductCard
