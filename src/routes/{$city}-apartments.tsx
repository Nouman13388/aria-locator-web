import { useEffect } from "react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { CityPicker } from "../components/ui/CityPicker";
import { findCity } from "../data/cities";
import { cityCopy } from "../data/cityPage";
import { saveCity } from "../features/listings/cityPreference";
// Layout for every page of a city: one loader validates the slug for all children.
export const Route = createFileRoute("/{$city}-apartments")({
  loader: ({ params }) => {
    const city = findCity(params.city);
    if (!city) throw notFound();
    return city;
  },
  notFoundComponent: CityNotFound,
  component: CityLayout,
});
function CityLayout() {
  const city = Route.useLoaderData();
  useEffect(() => saveCity(city.slug), [city.slug]);
  return <Outlet />;
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
