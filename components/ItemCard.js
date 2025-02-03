import { useAuth } from '@/context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ItemCard = ({ item }) => {
    const { addToCart } = useCart();
    const {user} = useAuth();

    const handleError = (e) => {
        e.target.src = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081"; // Set placeholder image if original image fails to load
    };

    const handleAddToCart = () => {
        if (!user) {
            toast.error('Please login or register to add products to cart.');
            return;
        }
        addToCart(item);
    };

    return (
        <div className="border rounded-lg shadow-md p-4 m-2 flex flex-col h-full">
            <img src={item.imageSrc} alt={item.title} className="h-48 w-full object-cover rounded-t-lg" onError={handleError} />
            <h3 className="text-lg font-semibold mt-2 line-clamp-2">{item.title}</h3> {/* Use line-clamp for title */}
            <p className="text-gray-600">{item.type}</p>
            <p className="text-xl font-bold mt-2">₹{item.variantPrice?.toFixed(2)}</p>
            <div className="mt-auto"> {/* Push button to the bottom */}
                <button
                    onClick={handleAddToCart}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ItemCard;