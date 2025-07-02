import React, { useState } from "react";
import { Images } from "@/assets";
import { X } from "lucide-react";
import { IRentCar } from "@/utils/Types/user/rentCarTypes";


interface rentCarDetailsProps {
  data: IRentCar & { typeOfAsset: "rentcar" };
}



const RentCarDetails: React.FC<rentCarDetailsProps> = ({data}) => {
  const [showGallery, setShowGallery] = useState(false);
 
   const allImages = [
     Images.conventionCenter_service,
     Images.cater_service,
     Images.rentCar_service,
     Images.studio_service,
   ];
 
   return (
     <div className="relative mt-16 sm:mt-20 md:mt-24 font-JosephicSans">
       <div className="w-full max-w-[1350px] mx-auto p-1">
         <div className="grid lg:grid-cols-3 gap-2">
           <div className="lg:col-span-2">
             <img
               src={allImages[0]}
               alt="Main"
               onClick={() => setShowGallery(true)}
               className="w-full sm:h-[510px] object-cover rounded-md cursor-pointer"
             />
           </div>
           <div className="hidden lg:grid grid-cols-2 gap-2 h-full">
             {allImages.slice(1, 5).map((img, i) => (
               <img
                 key={i}
                 src={img}
                 alt={`img${i}`}
                 className="w-full h-[250px] object-cover rounded-md"
               />
             ))}
           </div>
         </div>
       </div>
 
       {showGallery && (
         <div className="fixed inset-0 z-50 bg-black bg-opacity-95 p-4 overflow-y-auto">
           <div className="flex justify-end mb-4">
             <button
               onClick={() => setShowGallery(false)}
               className="text-white"
             >
               <X size={30} />
             </button>
           </div>
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
             {allImages.map((img, i) => (
               <img
                 key={i}
                 src={img}
                 alt={`gallery-${i}`}
                 className="w-full aspect-square object-cover rounded-md"
               />
             ))}
           </div>
         </div>
       )}
       <div className="w-full max-w-[1350px] mx-auto grid lg:grid-cols-3 gap-6 p-4 pb-28">
         <div className="lg:col-span-2 space-y-6">
           <h1 className="text-2xl font-bold">
             Dark Retro Dive Bar With Booths and Liquor Wall
             {data.carName}
           </h1>
           <p className="text-sm text-gray-500">Studio • Los Angeles, CA</p>
 
           <div className="flex flex-wrap gap-2 mt-2 text-xs text-white">
             {["Bar", "Clubhouse", "Retro", "Indoor"].map((tag) => (
               <span key={tag} className="bg-gray-700 px-2 py-1 rounded">
                 {tag}
               </span>
             ))}
           </div>
 
           <div>
             <h2 className="text-lg font-semibold mb-1">About the Space</h2>
             <p className="text-sm text-gray-700">
               Step into a neon-lit wonderland — a barroom that oozes moody vibes
               with vintage furniture, a richly decorated liquor wall, and
               ambient colored lighting.
             </p>
           </div>
 
           <div>
             <h3 className="font-semibold text-gray-800">Details</h3>
             <div className="grid grid-cols-2 text-sm text-gray-600 mt-1">
               <div>Style:</div>
               <div>Clubhouse, Industrial</div>
               <div>Property size:</div>
               <div>1,000 sq ft</div>
             </div>
           </div>
 
           <div>
             <h3 className="font-semibold text-gray-800">
               Parking & Accessibility
             </h3>
             <ul className="list-disc list-inside text-sm text-gray-600">
               <li>Street level access</li>
               <li>Free onsite parking</li>
             </ul>
           </div>
 
           <div>
             <h3 className="font-semibold text-gray-800">Amenities</h3>
             <div className="flex gap-4 flex-wrap text-sm text-gray-600">
               <span>Wi-Fi</span>
               <span>Restrooms</span>
             </div>
           </div>
 
           <div>
             <h3 className="font-semibold text-gray-800">Features</h3>
             <div className="flex gap-4 flex-wrap text-sm text-gray-600">
               <span>Color Walls</span>
               <span>Exposed Brick</span>
               <span>Wood Beams</span>
               <span>Decorative Lighting</span>
             </div>
           </div>
 
           <div>
             <h3 className="font-semibold text-gray-800">Catering & Drinks</h3>
             <div className="text-sm text-gray-600 space-y-1">
               <p>BYO alcohol allowed</p>
               <p>Bar menu available</p>
               <p>Full kitchen access</p>
             </div>
           </div>
           <div className="border-t pt-6 mt-6 space-y-4">
             <h3 className="text-lg font-semibold text-gray-800">
               5.0 · 2 reviews
             </h3>
             <div className="space-y-2 text-sm text-gray-700">
               <div>
                 <p className="font-semibold">Kent S.</p>
                 <p>
                   Nice little lounge for shooting. Had a great experience. The
                   owners were friendly and easy to work with. Will definitely go
                   back to shoot more.
                 </p>
               </div>
               <div>
                 <p className="font-semibold">Josh A.</p>
                 <p>
                   Great space, responsive host as well as friendly and
                   accommodating. Very smooth and relaxing experience.
                 </p>
               </div>
             </div>
             <button className="text-main_color text-sm font-semibold hover:underline">
               Show all 2 reviews
             </button>
           </div>
           <div className="border-t  pt-6 mt-6 space-y-4">
             <h3 className="text-lg font-semibold text-gray-800">
               Other listings at this address
             </h3>
             <div className="space-y-4">
               {[1, 2].map((item, idx) => (
                 <div key={idx} className="flex gap-4">
                   <img
                     src={Images.conventionCenter_service}
                     alt="Other listing"
                     className="w-28 h-20 rounded-md object-cover"
                   />
                   <div className="flex flex-col justify-between">
                     <p className="text-sm font-semibold text-gray-800">
                       Multi Set Production Studio, 90s Bedrooms + More
                     </p>
                     <p className="text-xs text-gray-600">
                       Los Angeles, CA · 1 hr minimum · $75/hr
                     </p>
                     <span className="text-main_color text-xs font-semibold">
                       5.0 (3)
                     </span>
                   </div>
                 </div>
               ))}
             </div>
           </div>
           <div className="border-t border-b pt-6 mt-6 grid sm:grid-cols-2 gap-6 p-4">
             <div>
               <h3 className="text-lg font-semibold text-gray-800">Questions</h3>
               <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
                 <li>
                   What are the unique attractions I can visit at this location?
                 </li>
                 <li>What types of activities are allowed at this location?</li>
                 <li>How many guests can the location host?</li>
                 <li>How spacious is the location?</li>
               </ul>
             </div>
             <div>
               <h3 className="text-lg font-semibold text-gray-800">
                 Location Rules
               </h3>
               <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
                 <li>Adult filming</li>
                 <li>Alcohol</li>
                 <li>Electricity usage</li>
                 <li>Loud noises</li>
                 <li>Outside catering/food</li>
                 <li>Smoking</li>
               </ul>
             </div>
           </div>
           <div className=" pt-6 mt-6 border border-gray-300 p-4 rounded-md bg-gray-100">
             <h3 className="text-lg font-semibold text-gray-800 mb-2">
               Hosted by Michael P.
             </h3>
             <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-600">
               <div>
                 <p>Member since December 2022</p>
                 <p className="text-xs mt-1 text-main_color">
                   Responds within a few hours
                 </p>
               </div>
               <button className="text-base mt-2 sm:mt-0 bg-gray-200 text-gray-800 px-4 py-2 rounded border hover:border-main_color_hover hover:text-main_color_hover">
                 Message Host
               </button>
             </div>
           </div>
         </div>
         <div className="hidden lg:block space-y-4 rounded-md">
           <div className="border p-4 rounded shadow-sm">
             <h2 className="text-xl font-semibold">$75/hr</h2>
             <p className="text-sm text-gray-500">2 hr minimum</p>
             <button className="w-full mt-3 bg-main_color text-white py-2 rounded hover:bg-main_color_hover">
               Instant Book
             </button>
           </div>
 
           <div className="border p-4 rounded shadow-sm">
             <p className="text-gray-700 text-sm mb-2">Hosted by: Michael B</p>
             <button className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300">
               Message Host
             </button>
           </div>
         </div>
       </div>
       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 p-4 shadow-md">
         <div className="flex items-center justify-between">
           <div>
             <h2 className="text-lg font-semibold">$75/hr</h2>
             <p className="text-xs text-gray-500">2 hr minimum</p>
           </div>
           <button className="bg-main_color text-white px-4 py-2 rounded">
             Instant Book
           </button>
         </div>
       </div>
     </div>
   );
 };
export default RentCarDetails;
