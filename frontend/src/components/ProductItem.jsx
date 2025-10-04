import React from "react";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  // Handle both ways of receiving data - as full product object or individual props
  const product = props.product || {
    _id: props._id,
    name: props.name,
    price: props.price,
    image: props.image,
    bestseller: props.bestseller,
  };

  if (!product) return null;

  // Handle image array or single image
  const imageUrl = Array.isArray(product.image)
    ? product.image[0]
    : product.image;

  return (
    <Link
      to={`/product/${product._id}`}
      className="block group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.bestseller && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
            Bestseller
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-bold text-gray-900">₹{product.price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
