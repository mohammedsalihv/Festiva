import React from "react";

interface CategoryCardProps {
    title: string
    imageUrl: string
  }
 const CategoryCard : React.FC<CategoryCardProps> = ({ title, imageUrl }) => {
    return (
      <div
      className={`
        relative 
        h-[250px] sm:h-[300px] md:h-[300px] lg:h-[400px] xl:h-[400px]
        w-[220px] hover:w-[325px] md:w-[225px] lg:w-[225px] xl:w-[225px]
        transition-all duration-500
       shadow-md group overflow-hidden
        cursor-pointer
      `}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300" />
      <div className="absolute bottom-4 left-4 right-4 text-white text-sm group-hover:text-lg font-semibold transition-all duration-300">
        {title}
      </div>
    </div>
    
    )
  }
export default  CategoryCard;