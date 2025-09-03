import { useState } from "react"
import type { CartItem } from "../App"

type CartSidebarProps = {
  cart: CartItem[]
  increaseQty: (id: number) => void
  decreaseQty: (id: number) => void
  deleteFromCart: (id: number) => void
  onOrderStartNew?: () => void
}

const CartSidebar = ({ cart, deleteFromCart, onOrderStartNew }: CartSidebarProps) => {
  const [showModal, setShowModal] = useState(false);

  const orderTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    setShowModal(true);
  };

  const handleStartNew = () => {
    setShowModal(false);
    if (onOrderStartNew) onOrderStartNew();
  };

  return (
    <>
      <aside className="cart-sidebar bg-white rounded-3xl shadow-lg w-full max-w-md mx-auto mt-8 p-4 sm:p-8">
        <h2 className="text-rose-600 text-2xl sm:text-4xl font-bold mb-6 sm:mb-10 text-center">Your cart ({cart.length})</h2>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center text-center text-gray-500">
            <img src="../../assets/images/illustration-empty-cart.svg" alt="Empty Cart" className="mb-5 w-32 sm:w-40"/>
            <p>Your added items will appear here</p>
          </div>
        ) : (
          <>
            <ul>
              {cart.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="flex flex-col sm:flex-row items-center justify-between p-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <img src={item.image.thumbnail} alt={item.name} width={50} className="rounded-full border-3 border-red-700"/>
                        <span className="text-base sm:text-xl font-medium">{item.name}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 mt-2">
                        <span className="text-base sm:text-xl font-bold text-red-600">x{item.quantity}</span>
                        <span className="text-base sm:text-xl font-light">${item.price}</span>
                        <span className="text-base sm:text-xl font-bold text-green-700">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <button onClick={() => deleteFromCart(item.id)} className="group">
                        <img
                          src="../../assets/images/icon-remove-item.svg"
                          alt="Delete"
                          className="border-3 border-red-600 p-2 w-10 rounded-full transition-all duration-200 group-hover:filter group-hover:invert group-hover:sepia group-hover:saturate-200 group-hover:hue-rotate-[-50deg] group-hover:brightness-150"
                        />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="mt-10 bg-rose-600 p-5 w-full rounded-4xl text-xl sm:text-2xl font-bold text-white hover:bg-rose-700 ease-in-out duration-300 cursor-pointer"
              onClick={handleConfirmOrder}
              disabled={cart.length === 0}
            >
              Confirm Order
            </button>
          </>
        )}
      </aside>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-10 w-11/12 max-w-md shadow-lg text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-green-700 mb-6">Order Confirmed</h1>
            <ul className="mb-6">
              {cart.map(item => (
                <li key={item.id} className="mb-2 flex justify-between items-center text-base sm:text-lg">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="text-xl sm:text-2xl font-bold mb-6">
              Order Total: <span className="text-red-600">${orderTotal.toFixed(2)}</span>
            </div>
            <button
              className="bg-rose-600 px-6 py-3 rounded-full text-white font-bold text-lg sm:text-xl hover:bg-rose-700 w-full"
              onClick={handleStartNew}
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CartSidebar

