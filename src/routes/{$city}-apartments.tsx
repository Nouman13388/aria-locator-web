import { useEffect } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { CityPicker } from "../components/ui/CityPicker";
import { findCity } from "../data/cities";
import { cityCopy, cityHead } from "../data/cityPage";
import { saveCity } from "../features/listings/cityPreference";
import {
  CityClosing,
  CityContact,
  CityFeatured,
  CityHero,
  CityHow,
  CityWhy,
} from "../features/city/CitySections";
export const Route = createFileRoute("/{$city}-apartments")({
  loader: ({ params }) => {
    const city = findCity(params.city);
    if (!city) throw notFound();
    return city;
  },
  head: ({ loaderData }) => (loaderData ? cityHead(loaderData) : {}),
  notFoundComponent: CityNotFound,
  component: CityPage,
});
function CityPage() {
  const city = Route.useLoaderData();
  useEffect(() => saveCity(city.slug), [city.slug]);
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
function CityNotFound() {
  return (
    <div className="wrap section center">
      <span className="eyebrow accent">404</span>
      <h1>{cityCopy.notFoundTitle}</h1>
      <p>{cityCopy.notFoundText}</p>
      <CityPicker variant="hero" />
    </div>
  );
}
