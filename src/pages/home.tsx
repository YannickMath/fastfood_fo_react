import AdvertisementCard from "../components/advertisementCard";

const burgerAdvertisement = {
  id: 2,
  name: "Le cheese",
  description:
    "Steak, fromage, salade, tomate, oignons, cornichons, ketchup, moutarde",
  price: 699,
  quantity: 1,
  category: 1,
  image: "/beefCrispy.jpg",
};

const pizzaAdvertisement = {
  id: 12,
  name: "La Calzone",
  description: "Tomate, mozzarella, jambon, champignons, oeuf",
  price: 1099,
  quantity: 2,
  category: 2,
  image: "/pizzaChampetre.jpg",
};
const jwwt = localStorage.getItem("jwt");
console.log("JWT:", jwwt);
export default function Home() {
  return (
    <div className="min-h-screen bg-white w-full sm:grid grid-cols-4 grid-rows-3">
      <AdvertisementCard product={burgerAdvertisement} />
      <div className="bg-[url(./assets/logo.png)] col-start-2 col-span-2 row-span-1 bg-cover border border-gray-200"></div>{" "}
      <AdvertisementCard product={pizzaAdvertisement} />
      <div className="bg-[url(./assets/pizza.jpg)] bg-cover col-start-1 col-span-2 row-span-2 border border-gray-200"></div>
      <div className="bg-[url(./assets/hamburger.jpg)] bg-cover col-start-3 col-span-4 row-span-2 border border-gray-200"></div>
    </div>
  );
}
