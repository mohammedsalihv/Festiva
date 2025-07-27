import { Images } from "@/assets";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { myAssets } from "@/api/host/hostAccountService";
import { useDispatch, useSelector } from "react-redux";
import { setMyAssets } from "@/redux/Slice/host/common/myAssetsSlice";
import { RootState } from "@/redux/store";
import Pagination from "@/components/Pagination";

const mockAssets = [
  {
    id: 1,
    name: "Xiaomi Monitor 27 Inch",
    category: "Monitor",
    price: 100,
    rating: 4.8,
    image: Images.business_space,
  },
  {
    id: 2,
    name: "Xiaomi 14T",
    category: "Smartphone",
    price: 450,
    rating: 4.8,
    image: Images.business_space,
  },
  {
    id: 3,
    name: "Xiaomi 14T Pro",
    category: "Smartphone",
    price: 520,
    rating: 4.8,
    image: Images.business_space,
  },
  {
    id: 4,
    name: "Philips Monitor 24Inch",
    category: "Monitor",
    price: 140,
    rating: 4.8,
    image: Images.business_space,
  },
  {
    id: 5,
    name: "Samsung Galaxy A35",
    category: "Smartphone",
    price: 274,
    rating: 4.8,
    image: Images.business_space,
  },
  {
    id: 6,
    name: "Xiaomi 13T",
    category: "Smartphone",
    price: 410,
    rating: 4.8,
    image: Images.business_space,
  },
  {
    id: 7,
    name: "Samsung Galaxy A55",
    category: "Smartphone",
    price: 340,
    rating: 4.8,
    image: Images.business_space,
  },
];

export default function MyAssets() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredAssets = mockAssets.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.myAssets.assets);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageLimit = 10;

  const fetchMyAssets = async (pageNumber: number, pageLimit: number) => {
    const response = await myAssets(pageNumber, pageLimit);
    dispatch(setMyAssets(response.data));
    setCurrentPage(pageNumber);
    setTotalPages(response.totalPages);
  };

  useEffect(() => {
    fetchMyAssets(currentPage, pageLimit);
  }, []);

  console.log(assets);

  const handlePageChange = (page: number) => {
    fetchMyAssets(page, pageLimit);
  };

  return (
    <div className="px-3 py-8 md:px-10 md:py-8 font-poppins">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap- border-b p-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-none mb-2">
          <Button className="p-3 bg-black text-white text-xs sm:text-base md:text-base rounded font-poppins">
            All
          </Button>
          <Button className="p-3 bg-gray-100 text-xs sm:text-base md:text-base rounded font-poppins">
            Available
          </Button>
          <Button className="p-3 bg-gray-100 text-xs sm:text-base md:text-base rounded font-poppins">
            Not Available
          </Button>
          <Button className="p-3 bg-gray-100 text-xs sm:text-base md:text-base rounded font-poppins">
            Venues
          </Button>
          <Button className="p-3 bg-gray-100 text-xs sm:text-base md:text-base rounded font-poppins">
            Rent Cars
          </Button>
          <Button className="p-3 bg-gray-100 text-xs sm:text-base md:text-base rounded font-poppins">
            Caters
          </Button>
          <Button className="p-3 bg-gray-100 text-xs sm:text-base md:text-base rounded font-poppins">
            Studios
          </Button>
        </div>
        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <Input
            type="text"
            placeholder="Search Product"
            className="pr-9 pl-8 py-1 rounded border text-sm w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 cursor-pointer">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white shadow overflow-hidden hover:shadow-md transition"
          >
            <img
              src={asset.image}
              alt={asset.name}
              className="h-52 sm:h-56 md:h-60 object-cover w-full"
            />
            <div className="p-3">
              <h3 className="font-semibold text-base md:text-md">
                {asset.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                {asset.category}
              </p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-sm md:text-base">
                  ${asset.price.toFixed(2)}
                </span>
                <span className="text-yellow-500 text-sm md:text-base">
                  ★ {asset.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
