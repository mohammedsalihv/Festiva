import { Images } from "@/assets";

const support = [
  Images.c_1,
  Images.c_2,
  Images.c_3,
  Images.c_4,
  Images.c_5,
  Images.c_6,
  Images.c_7,
  Images.c_8,
];

const Supporters = () => {
  return (
    <div>
      <h2 className="text-sm lg:text-2xl text-center sm:text-left font-semibold mb-10">
        OUR SUPPORTERS
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
        {support.map((img, i) => (
          <div key={i} className="flex items-center justify-center py-4">
            <img
              src={img}
              className="h-12 object-contain grayscale-0 hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Supporters;
