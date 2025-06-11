import { useParams } from "react-router-dom";
import ServicesCard from "@/reusable-components/user/Landing/ServiceCard";

const assets = [
  {
    id: 1,
    title: "Modern Farmhouse on 20 acres",
    costPerDay: 200,
    place: "Lompoc, CA",
    images: ["/example1.jpg"],
    rating: 4.8,
    category:'venue'
  },
  {
    id: 2,
    title: "Historic Building with Outdoor Space",
    costPerDay: 100,
    place: "Guadalupe, CA",
    images: ["/example2.jpg"],
    rating: 5.0,
    category:'venue'
  },
  {
    id: 2,
    title: "Historic Building with Outdoor Space",
    costPerDay: 100,
    place: "Guadalupe, CA",
    images: ["/example2.jpg"],
    rating: 5.0,
    category:'venue'
  },
  {
    id: 2,
    title: "Historic Building with Outdoor Space",
    costPerDay: 100,
    place: "Guadalupe, CA",
    images: ["/example2.jpg"],
    rating: 5.0,
    category:'venue'
  },
  {
    id: 2,
    title: "Historic Building with Outdoor Space",
    costPerDay: 100,
    place: "Guadalupe, CA",
    images: ["/example2.jpg"],
    rating: 5.0,
    category:'venue'
  },
  {
    id: 2,
    title: "Historic Building with Outdoor Space",
    costPerDay: 100,
    place: "Guadalupe, CA",
    images: ["/example2.jpg"],
    rating: 5.0,
    category:'venue'
  },
  {
    id: 2,
    title: "Historic Building with Outdoor Space",
    costPerDay: 100,
    place: "Guadalupe, CA",
    images: ["/example2.jpg"],
    rating: 5.0,
    category:'venue'
  },
];


export default function ServicesPage() {
  const { type } = useParams();
  const normalizedType = type?.toLowerCase();

  const filteredAssets = assets.filter((asset) =>
    asset.category.toLowerCase() === normalizedType
  );

  return <ServicesCard assets={filteredAssets} />;
}
