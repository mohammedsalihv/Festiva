import React, { useEffect, useState } from "react";
import { Loader, Star } from "lucide-react";
import { allReviews } from "@/api/host/hostAccountService";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/components/Pagination";
import { RootState } from "@/redux/store";
import { setAllReviews } from "@/redux/Slice/host/common/reviewsSlice";
import { IoIosRefresh } from "react-icons/io";
import SwitchTabs from "@/components/SwitchTabs";
import { tabOptions } from "@/utils/Options/admin/adminService";

interface Review {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Devon Lane",
    role: "Designer",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    review:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.",
  },
  {
    id: "2",
    name: "Jane Cooper",
    role: "Developer",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    review:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos.",
  },
  {
    id: "3",
    name: "Eleanor Pena",
    role: "Manager",
    avatar: "https://i.pravatar.cc/150?img=13",
    rating: 5,
    review:
      "Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi.",
  },
];

const HostReviews: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const dispatch = useDispatch();
  const pageLimit = 6;

  const recivedReviews = useSelector(
    (state: RootState) => state.hostRecivedReviews.reviews
  );

  console.log(recivedReviews);
  const fetchAllReviews = async (pageNumber: number, pageLimit: number) => {
    setLoading(true);
    try {
      const response = await allReviews(pageNumber, pageLimit);
      dispatch(setAllReviews(response.reviews));
      setCurrentPage(pageNumber);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews(currentPage, pageLimit);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const handlePageChange = (page: number) => {
    fetchAllReviews(page, pageLimit);
  };

  return (
    <section className="py-12 bg-white font-poppins">
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader />
        </div>
      ) : recivedReviews.length === 0 ? (
        <div className="flex items-center justify-center py-20 text-center gap-2">
          <p className="text-gray-500 text-lg font-semibold">
            No reviews found{" "}
          </p>
          <IoIosRefresh
            onClick={() => {
              setActiveTab("all");
              fetchAllReviews(currentPage, pageLimit);
            }}
            className="w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer"
          />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4">
          <div className="px-4 pt-4">
            <SwitchTabs
              options={tabOptions}
              value={activeTab}
              onChange={setActiveTab}
            />
          </div>
          <div className="text-center mb-12">
            <button className="text-sm font-medium bg-green-100 text-green-600 px-4 py-1 rounded-full mb-4">
              User Reviews
            </button>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              More than {reviews.length} Happy Users
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium totam rem aperiam.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border"
              >
                {/* User */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>

                {/* Review */}
                <p className="text-gray-600 text-sm mb-4">{review.review}</p>
                <div className="flex items-center gap-3 justify-between text-yellow-400">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-black">{review.rating}.0</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default HostReviews;
