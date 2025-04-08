import React from "react";

interface CategoryCardProps {
    title: string
    imageUrl: string
  }
  
 const CategoryCard : React.FC<CategoryCardProps> = ({ title, imageUrl }) => {
    return (
      <div
        className={`
          relative h-[400px]
          w-[210px] hover:w-[350px]
          transition-all duration-500
          rounded-lg shadow-md group overflow-hidden
          cursor-pointer
        `}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300" />
  
        {/* Title */}
        <div className="absolute bottom-4 left-4 right-4 text-white text-sm group-hover:text-lg font-semibold transition-all duration-300">
          {title}
        </div>
      </div>
    )
  }
  
export default  CategoryCard;