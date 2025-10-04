import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";





const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const product = Array.isArray(products)
    ? products.find((p) => String(p._id) === String(productId))
    : null;

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <img src={assets.logo} alt="Not Found" className="w-40 opacity-20 object-contain" />
        <p className="text-2xl font-semibold text-gray-600">Product not found</p>
        <button
          onClick={() => navigate("/collection")}
          className="px-8 py-3 bg-black text-white rounded-full hover:opacity-90"
        >
          Back to Collection
        </button>
      </div>
    );
  }

  const productImage =
    Array.isArray(product.image) && product.image.length > 0 ? product.image[0] : product.image;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Fixed square product image */}
        <div className="h-[400px] w-[400px] mx-auto rounded-lg overflow-hidden shadow-lg">
          <img src={productImage} alt={product.name} className="object-cover w-full h-full" />
        </div>

        {/* Product info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-3xl font-extrabold">₹{product.price}</p>

          {/* Stock Availability */}
          <p className="text-green-600 font-semibold">In Stock</p>

          {/* Sizes selector if available */}
          {product.sizes.length > 0 && (
            <div>
              <p className="font-medium mb-2">Select Size</p>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border rounded-full w-12 h-12 flex items-center justify-center font-semibold ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "border-gray-300 text-gray-800"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 text-xl font-bold rounded-full border flex items-center justify-center"
              aria-label="Decrease quantity"
            >
              –
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 text-xl font-bold rounded-full border flex items-center justify-center"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <button
              onClick={() => {
                if (product.sizes.length > 0 && !selectedSize) {
                  alert("Please select a size");
                  return;
                }
                addToCart(product._id, quantity, selectedSize);
                navigate("/cart");
              }}
              disabled={product.sizes.length > 0 && !selectedSize}
              className={`flex-grow py-4 rounded-full text-white font-bold text-center ${
                product.sizes.length > 0 && !selectedSize
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:opacity-90"
              }`}
            >
              Add to Cart
            </button>
            {/* Static Buy Now button */}
            <button
              onClick={() => alert("Buy Now clicked (static)") }
              className="flex-grow py-4 rounded-full border border-black font-bold hover:bg-black hover:text-white transition"
            >
              Buy Now
            </button>
          </div>

          {/* Static Size Guide */}
          <div className="border-t pt-4 text-gray-600 text-sm">
            <h3 className="font-semibold mb-2">Size Guide</h3>
            <p>Refer to the size chart before selecting to ensure the perfect fit.</p>
          </div>

          {/* Static Customer Reviews */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Customer Reviews</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>John D.</strong> ★★★★☆</p>
              <p>Good quality product. Fits well.</p>
              <hr />
              <p><strong>Mary S.</strong> ★★★★★</p>
              <p>Perfect material and color. Highly recommend!</p>
            </div>
          </div>

          {/* Static Related Products */}
          {/* Related Products */}
<div className="border-t pt-4">
  <h3 className="font-semibold mb-3">Related Products</h3>
  <div className="grid grid-cols-3 gap-4">
    {products
      .filter(
        (p) => p.category === product.category && p._id !== product._id
      )
      .slice(0, 3)
      .map((related) => {
        const imgSrc = Array.isArray(related.image)
          ? related.image[0]
          : related.image;
        return (
          <img
            key={related._id}
            src={imgSrc}
            alt={related.name}
            className="rounded cursor-pointer hover:opacity-80"
            onClick={() => navigate(`/product/${related._id}`)}
          />
        );
      })}
  </div>
</div>


          {/* Static Share Buttons */}
          <div className="border-t pt-4">
  <h3 className="font-semibold mb-3">Share</h3>
  <div className="flex gap-4 text-xl">
    <button aria-label="Share on Facebook" title="Facebook" className="hover:text-blue-600">
      <FontAwesomeIcon icon={faFacebookF} />
    </button>
    <button aria-label="Share on Twitter" title="Twitter" className="hover:text-blue-400">
      <FontAwesomeIcon icon={faTwitter} />
    </button>
    <button aria-label="Share on WhatsApp" title="WhatsApp" className="hover:text-green-500">
      <FontAwesomeIcon icon={faWhatsapp} />
    </button>
  </div>
</div>

          {/* Static Policies & Info */}
          <div className="border-t pt-4 text-gray-600 text-sm space-y-2">
            <p><strong>Return & Refund:</strong> 30-day easy return policy.</p>
            <p><strong>Delivery:</strong> Expected delivery within 5-7 business days.</p>
            <p><strong>Payment:</strong> Secure payment methods available.</p>
            <p><strong>Authenticity:</strong> 100% genuine products guaranteed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
