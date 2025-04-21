import { Images } from '@/assets';
import React , {useState} from 'react'

const CarFeatures : React.FC = () => {
    const [features, setFeatures] = useState<string[]>([]);
    const [inclusion, setInclusion] = useState("");
    const [terms, setTerms] = useState("");
  
    const handleCheckboxChange = (value: string) => {
      setFeatures((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    };
  
    return (
      <div className="max-w-6xl mx-auto mt-10 p-8 bg-white flex flex-col">

      <div className="flex flex-col md:flex-row items-start justify-between p-6 max-w-4xl mx-auto font-sans gap-14">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <h2 className="text-xl font-semibold">Describe the features of the service</h2>
          <div className="flex flex-col gap-2 text-gray-700">
            {["Deposit", "Power window", "Book & papers", "A/C"].map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={features.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                  className="w-4 h-4"
                />
                {item}
              </label>
            ))}
          </div>
  
          <textarea
            className="border border-gray-300 rounded-md p-2 mt-2"
            placeholder="inclusion"
            rows={3}
            value={inclusion}
            onChange={(e) => setInclusion(e.target.value)}
          />
  
          <textarea
            className="border border-gray-300 rounded-md p-2"
            placeholder="Terms & Conditions"
            rows={3}
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          />
        </div>
        <div className="border rounded-md px-14 p-8 w-full md:w-1/2 flex flex-col items-center justify-center text-center gap-8">
          <img
            src={Images.car_rent}
            alt="Service Icon"
            className="w-20 h-20 object-contain"
          />
          <p className="text-sm text-gray-500 max-w-xs">
            If your location is associated with more than one category, please select the one that fits best. When choosing a type, please select up to five types only.
          </p>
        </div>
      </div>
      <div className="w-full mt-4">
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md float-right transition-colors duration-300">
            Next
          </button>
        </div>
      </div>
      
    );
  };
  

export default CarFeatures