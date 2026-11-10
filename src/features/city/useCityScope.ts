import { useParams } from "@tanstack/react-router";
import { useSyncExternalStore } from "react";
import { CITIES, findCity, type CitySlug } from "../../data/cities";
import { getSavedCity, getServerCity, subscribeCity } from "../listings/cityPreference";
// Current city: the route's city, else the saved choice, else the first demo city.
export function useCityScope(): CitySlug {
  const param = useParams({ strict: false }).city;
  const saved = useSyncExternalStore(subscribeCity, getSavedCity, getServerCity);
  return findCity(param)?.slug ?? saved ?? CITIES[0].slug;
}
