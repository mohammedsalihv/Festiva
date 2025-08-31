import { useEffect, useState } from "react";
import { Loader, Star } from "lucide-react";
import { allReviews } from "@/api/host/hostAccountService";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/components/Pagination";
import { RootState } from "@/redux/store";
import { setAllReviews } from "@/redux/Slice/host/common/reviewsSlice";
import { IoIosRefresh } from "react-icons/io";
import SwitchTabs from "@/components/SwitchTabs";
import { tabOptions } from "@/utils/Options/admin/adminService";

const HostReviews  = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const dispatch = useDispatch();
  const pageLimit = 6;

  const recivedReviews = useSelector(
    (state: RootState) => state.hostRecivedReviews.reviews
  );
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

const filteredReviews = activeTab === "all"
  ? recivedReviews
  : recivedReviews.filter((review) => review.assetType === activeTab);


  const handlePageChange = (page: number) => {
    fetchAllReviews(page, pageLimit);
  };

  return (
    <section className="py-8 bg-white font-poppins">
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
        <div className="max-w-7xl mx-auto px-2">
          <div className="px-4 pt-4 py-4">
            <SwitchTabs
              options={tabOptions}
              value={activeTab}
              onChange={setActiveTab}
            />
          </div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              More than {recivedReviews.length} Happy Users
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Trusted by real people for real experiences — because your
              satisfaction is our top priority.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredReviews.map((review) => (
              <div
                key={review._id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border"
              >
                {/* User */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.createrProfilePic}
                    alt={review.createrName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{review.createrName}</h4>
                    <p className="text-sm text-gray-500">
                      {review.createrRole}
                    </p>
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
