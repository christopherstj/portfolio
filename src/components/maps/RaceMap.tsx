"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface RaceMapProps {
  routeUrl: string;
  name: string;
  className?: string;
}

// Parse GPX to GeoJSON
function parseGPX(gpxText: string): GeoJSON.Feature<GeoJSON.LineString> | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(gpxText, "text/xml");
  
  const trackPoints = doc.querySelectorAll("trkpt");
  if (trackPoints.length === 0) {
    // Try route points
    const routePoints = doc.querySelectorAll("rtept");
    if (routePoints.length === 0) return null;
    
    const coordinates: [number, number][] = [];
    routePoints.forEach((pt) => {
      const lat = parseFloat(pt.getAttribute("lat") || "0");
      const lon = parseFloat(pt.getAttribute("lon") || "0");
      coordinates.push([lon, lat]);
    });
    
    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates,
      },
    };
  }
  
  const coordinates: [number, number][] = [];
  trackPoints.forEach((pt) => {
    const lat = parseFloat(pt.getAttribute("lat") || "0");
    const lon = parseFloat(pt.getAttribute("lon") || "0");
    coordinates.push([lon, lat]);
  });
  
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates,
    },
  };
}

// Extract coordinates from GeoJSON (handles Feature, FeatureCollection, or raw geometry)
function extractCoordinatesFromGeoJSON(data: GeoJSON.GeoJSON): [number, number][] | null {
  if (data.type === "FeatureCollection") {
    // Find the first LineString or MultiLineString feature
    for (const feature of data.features) {
      const coords = extractCoordinatesFromGeoJSON(feature);
      if (coords) return coords;
    }
    return null;
  }
  
  if (data.type === "Feature") {
    return extractCoordinatesFromGeometry(data.geometry);
  }
  
  // It's a raw geometry
  return extractCoordinatesFromGeometry(data as GeoJSON.Geometry);
}

function extractCoordinatesFromGeometry(geometry: GeoJSON.Geometry): [number, number][] | null {
  if (geometry.type === "LineString") {
    return geometry.coordinates as [number, number][];
  }
  if (geometry.type === "MultiLineString") {
    // Flatten all line strings
    return geometry.coordinates.flat() as [number, number][];
  }
  return null;
}

// Calculate bounds from coordinates
function getBounds(coordinates: [number, number][]): mapboxgl.LngLatBoundsLike {
  const lngs = coordinates.map((c) => c[0]);
  const lats = coordinates.map((c) => c[1]);
  
  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ];
}

export function RaceMap({ routeUrl, name, className = "" }: RaceMapProps) {
  // Get the accent color from CSS variable
  const getAccentColor = () => {
    if (typeof window === "undefined") return "#FF6B00";
    const style = getComputedStyle(document.documentElement);
    const color = style.getPropertyValue("--accent").trim();
    if (!color) return "#FF6B00";
    // The CSS variable is already a hex color
    return color;
  };
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || token === "your_mapbox_token_here") {
      setError("Mapbox token not configured");
      setLoading(false);
      return;
    }

    mapboxgl.accessToken = token;

    const isGeoJSON = routeUrl.endsWith(".geojson") || routeUrl.endsWith(".json");

    // Fetch route file
    fetch(routeUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Route file not found");
        return isGeoJSON ? res.json() : res.text();
      })
      .then((data) => {
        let coordinates: [number, number][];
        let geojsonData: GeoJSON.Feature<GeoJSON.LineString>;

        if (isGeoJSON) {
          // Parse GeoJSON
          const coords = extractCoordinatesFromGeoJSON(data as GeoJSON.GeoJSON);
          if (!coords) throw new Error("Could not extract coordinates from GeoJSON");
          coordinates = coords;
          geojsonData = {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates,
            },
          };
        } else {
          // Parse GPX
          const parsed = parseGPX(data as string);
          if (!parsed) throw new Error("Could not parse GPX");
          geojsonData = parsed;
          coordinates = parsed.geometry.coordinates as [number, number][];
        }

        const bounds = getBounds(coordinates);

        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: "mapbox://styles/mapbox/outdoors-v12",
          bounds,
          fitBoundsOptions: { padding: 40 },
          interactive: true,
          attributionControl: false,
        });

        map.current.on("load", () => {
          if (!map.current) return;

          const accentColor = getAccentColor();

          // Remove existing source/layers if they exist
          if (map.current.getSource("route")) {
            if (map.current.getLayer("route-line")) map.current.removeLayer("route-line");
            map.current.removeSource("route");
          }

          // Add the route line
          map.current.addSource("route", {
            type: "geojson",
            data: geojsonData,
          });

          // Main line
          map.current.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": accentColor,
              "line-width": 3,
              "line-opacity": 1,
            },
          });

          // Start marker
          const startCoord = coordinates[0];
          new mapboxgl.Marker({ color: "#22c55e" })
            .setLngLat(startCoord)
            .addTo(map.current!);

          // End marker
          const endCoord = coordinates[coordinates.length - 1];
          new mapboxgl.Marker({ color: accentColor })
            .setLngLat(endCoord)
            .addTo(map.current!);

          setLoading(false);
        });
      })
      .catch((err) => {
        console.error("Error loading route:", err);
        setError(err.message);
        setLoading(false);
      });

    return () => {
      map.current?.remove();
    };
  }, [routeUrl]);

  if (error) {
    return (
      <div className={`relative bg-secondary border border-border flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="text-4xl mb-4">🗺️</div>
          <div className="text-sm font-mono text-foreground/40">{name}</div>
          <div className="text-xs text-foreground/20 mt-2">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-secondary flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
            <div className="text-sm font-mono text-foreground/40">Loading {name}...</div>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}

