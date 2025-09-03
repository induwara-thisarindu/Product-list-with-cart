import { useState, useEffect } from "react";
import CartSidebar from "./components/CartSidebar";
import ProductItems from "./components/ProductItems";
import ErrorBoundary from "./components/ErrorBoundary";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
};

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantity: Math.max(p.quantity - 1, 0) } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const deleteFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  // Clear cart and localStorage when starting a new order
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="flex flex-col lg:flex-row font-redhat min-h-screen bg-gray-50">
      <div className="w-full lg:w-2/3 px-4 lg:px-16">
        <h1 className="text-4xl lg:text-7xl font-bold font-redhat mt-10 lg:mt-20 mb-10 lg:mb-20 text-center lg:text-left">
          Desserts
        </h1>
        <ProductItems
          addToCart={addToCart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          deleteFromCart={deleteFromCart}
          cartItems={cartItems}
        />
      </div>
      <div className="w-full lg:w-1/3 px-4 lg:px-0">
        <ErrorBoundary>
          <CartSidebar
            cart={cartItems}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            deleteFromCart={deleteFromCart}
            onOrderStartNew={clearCart}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
