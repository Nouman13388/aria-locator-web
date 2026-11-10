import { createFileRoute } from "@tanstack/react-router";
import { findCity } from "../../data/cities";
import { cityHead } from "../../data/cityPage";
import {
  CityClosing,
  CityContact,
  CityFeatured,
  CityHero,
  CityHow,
  CityWhy,
} from "../../features/city/CitySections";
export const Route = createFileRoute("/{$city}-apartments/")({
  head: ({ params }) => {
    const city = findCity(params.city);
    return city ? cityHead(city) : {};
  },
  component: CityPage,
});
function CityPage() {
  const city = findCity(Route.useParams().city)!;
  return (
    <div className="city-page">
      <CityHero city={city} />
      <CityHow />
      <CityFeatured city={city} />
      <CityWhy />
      <CityClosing city={city} />
      <CityContact />
    </div>
  );
}
