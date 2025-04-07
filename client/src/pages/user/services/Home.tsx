import { Images } from "@/assets";
import Header from "@/reusable-components/Landing/Header";

const Home = () => {
  return (
<div className="relative">
  <Header />
  <section className="relative w-full h-[100vh] overflow-hidden">
    <img
      src={Images.home_image}
      alt="Landing"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/30 z-0" />
    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black z-10" />
  </section>
  <div className="bg-black h-96 z-20 relative" />
</div>
  );
};

export default Home;
