import {CartContext} from './cart-context';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function CartProvider({ children }) {
    const [cart, setCart] = useLocalStorage('campuseats-cart', [])
    const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

    function addToCart(item) {
        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex((line) => line.item.id === item.id)
            if (existingIndex > -1) {
                return prevCart.map((line, idx) =>
                    idx === existingIndex ? { ...line, qty: line.qty + 1} : line
                )
            }
            return [...prevCart, {item, qty: 1}]
        })
    }

//To adjust line item quantity (+1 or -1)
    function changeQty(itemId, delta) {
        setCart((prevCart) =>
            prevCart
                .map((line) => {
                    if (line.item.id === itemId) {
                        return { ...line, qty: line.qty + delta}
                    }
                    return line;
                })
                .filter((line) => line.qty > 0)
        )
    }

//To remove line item from cart
    function removeFromCart(itemId) {
        setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))      
    }

const count = cart.reduce((sum, line) => sum + line.qty, 0)
const total  = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

//To place orders
    function placeOrder(details) {
        const newOrder = {
            id: Date.now().toString(),
            ...details,
            items: cart,
            total,
            date: new Date().toISOString(),
        }
        setOrders((prevOrders) => [newOrder, ...prevOrders])
        setCart([])
        return newOrder
    }

    const value = {
        cart,
        orders,
        count,
        total,
        addToCart,
        changeQty,
        removeFromCart,
        placeOrder,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}