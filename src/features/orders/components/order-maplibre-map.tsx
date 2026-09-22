"use client";

import type { Feature, LineString } from "geojson";
import * as maplibregl from "maplibre-gl";
import { type GeoJSONSource, type Map as MapLibreMap, type Marker, type StyleSpecification } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import type { Order } from "@/features/orders/types/order";

type OrderMapLibreMapProps = {
  order: Order;
  pickupLabel: string;
  destinationLabel: string;
  errorLabel: string;
};

const routeSourceId = "order-route";
const osmRasterStyle: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
};

function createMarkerElement(color: string, label: string) {
  const element = document.createElement("div");
  element.className = "order-map-marker";
  element.style.setProperty("--marker-color", color);
  element.style.setProperty("--marker-foreground", "#ffffff");
  element.setAttribute("aria-label", label);
  element.textContent = "•";
  return element;
}

function updateOrderMap(map: MapLibreMap, markers: { pickup: Marker | null; destination: Marker | null }, order: Order, pickupLabel: string, destinationLabel: string) {
  const pickup: [number, number] = [order.coordinates.origin[1], order.coordinates.origin[0]];
  const destination: [number, number] = [order.coordinates.destination[1], order.coordinates.destination[0]];
  const route: Feature<LineString> = { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [pickup, destination] } };

  (map.getSource(routeSourceId) as GeoJSONSource | undefined)?.setData(route);

  if (markers.pickup) markers.pickup.setLngLat(pickup).setPopup(new maplibregl.Popup({ offset: 20 }).setText(`${pickupLabel}: ${order.origin}`));
  else markers.pickup = new maplibregl.Marker({ element: createMarkerElement("#0066ff", pickupLabel) }).setLngLat(pickup).setPopup(new maplibregl.Popup({ offset: 20 }).setText(`${pickupLabel}: ${order.origin}`)).addTo(map);

  if (markers.destination) markers.destination.setLngLat(destination).setPopup(new maplibregl.Popup({ offset: 20 }).setText(`${destinationLabel}: ${order.destination}`));
  else markers.destination = new maplibregl.Marker({ element: createMarkerElement("#10b981", destinationLabel) }).setLngLat(destination).setPopup(new maplibregl.Popup({ offset: 20 }).setText(`${destinationLabel}: ${order.destination}`)).addTo(map);

  map.fitBounds([pickup, destination], { padding: 56, maxZoom: 13, duration: 0 });
}

export default function OrderMapLibreMap({ order, pickupLabel, destinationLabel, errorLabel }: OrderMapLibreMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<{ pickup: Marker | null; destination: Marker | null }>({ pickup: null, destination: null });
  const latestOrderRef = useRef({ order, pickupLabel, destinationLabel });
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    latestOrderRef.current = { order, pickupLabel, destinationLabel };
  }, [destinationLabel, order, pickupLabel]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let mapInstance: MapLibreMap | null = null;
    const initializationTask = window.setTimeout(() => {
      if (disposed) return;
      mapInstance = new maplibregl.Map({ container, style: osmRasterStyle, center: [0, 0], zoom: 1 });
      mapRef.current = mapInstance;
      const activeMap = mapInstance;

      activeMap.once("style.load", () => {
        if (disposed) return;
        activeMap.addSource(routeSourceId, { type: "geojson", data: { type: "FeatureCollection", features: [] } });
        activeMap.addLayer({ id: routeSourceId, type: "line", source: routeSourceId, paint: { "line-color": "#0066ff", "line-width": 4, "line-opacity": 0.85 } });
        const { order: currentOrder, pickupLabel: currentPickupLabel, destinationLabel: currentDestinationLabel } = latestOrderRef.current;
        updateOrderMap(activeMap, markersRef.current, currentOrder, currentPickupLabel, currentDestinationLabel);
        setMap(activeMap);
      });
      activeMap.on("error", () => {
        if (!disposed && !activeMap.isStyleLoaded()) setHasError(true);
      });
    }, 0);

    return () => {
      disposed = true;
      window.clearTimeout(initializationTask);
      if (mapInstance) {
        mapInstance.remove();
        if (mapRef.current === mapInstance) mapRef.current = null;
        setMap((currentMap) => currentMap === mapInstance ? null : currentMap);
      }
    };
  }, []);

  useEffect(() => {
    if (map) {
      updateOrderMap(map, markersRef.current, order, pickupLabel, destinationLabel);
    }
  }, [destinationLabel, map, order, pickupLabel]);

  if (hasError) return <div role="status" className="grid h-full min-h-[650px] place-items-center bg-secondary px-6 text-center text-xs text-text-secondary">{errorLabel}</div>;

  return <div ref={containerRef} className="h-full min-h-[650px] w-full" />;
}
