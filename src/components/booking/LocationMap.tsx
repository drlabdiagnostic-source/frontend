import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl, { type Map as MapLibreMap, type Marker as MapLibreMarker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { Button } from "@/components/ui/button";
import { MapPin, Navigation, X, Plus, Minus } from "lucide-react";

interface LocationMapProps {
  onLocationSelect: (address: string, lat: number, lng: number) => void;
  onClose: () => void;
}

const DEFAULT_CENTER = { lat: 20.5937, lng: 78.9629 };
const DEFAULT_ZOOM = 4;
const MAX_ZOOM = 18;

export function LocationMap({ onLocationSelect, onClose }: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markerRef = useRef<MapLibreMarker | null>(null);

  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const style = useMemo(
    () => ({
      version: 8,
      sources: {
        osm: {
          type: "raster",
          tiles: [
            "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
          ],
          tileSize: 256,
          attribution: "© OpenStreetMap contributors",
        },
      },
      layers: [
        {
          id: "osm",
          type: "raster",
          source: "osm",
        },
      ],
    }),
    [],
  );

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: style as any,
      center: [DEFAULT_CENTER.lng, DEFAULT_CENTER.lat],
      zoom: DEFAULT_ZOOM,
      maxZoom: MAX_ZOOM,
      attributionControl: { compact: true },
    });

    mapRef.current = map;

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      setSelectedPosition({ lat, lng });

      if (!markerRef.current) {
        markerRef.current = new maplibregl.Marker({ color: "hsl(var(--primary))" })
          .setLngLat([lng, lat])
          .addTo(map);
      } else {
        markerRef.current.setLngLat([lng, lat]);
      }
    });

    return () => {
      markerRef.current?.remove();
      markerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, [style]);

  const zoomIn = () => mapRef.current?.zoomIn();
  const zoomOut = () => mapRef.current?.zoomOut();

  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setSelectedPosition({ lat, lng });

        const map = mapRef.current;
        if (map) {
          map.flyTo({ center: [lng, lat], zoom: 18, essential: true });
          if (!markerRef.current) {
            markerRef.current = new maplibregl.Marker({ color: "hsl(var(--primary))" })
              .setLngLat([lng, lat])
              .addTo(map);
          } else {
            markerRef.current.setLngLat([lng, lat]);
          }
        }

        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const handleConfirmLocation = async () => {
    if (!selectedPosition) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedPosition.lat}&lon=${selectedPosition.lng}`,
      );
      const data = await response.json();
      const address =
        data?.display_name || `${selectedPosition.lat.toFixed(6)}, ${selectedPosition.lng.toFixed(6)}`;

      onLocationSelect(address, selectedPosition.lat, selectedPosition.lng);
    } catch {
      onLocationSelect(
        `${selectedPosition.lat.toFixed(6)}, ${selectedPosition.lng.toFixed(6)}`,
        selectedPosition.lat,
        selectedPosition.lng,
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl border border-border shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Select Location on Map
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="relative h-80 bg-muted">
          <div ref={containerRef} className="absolute inset-0" />

          <div className="absolute right-3 top-3 flex flex-col gap-1">
            <Button size="icon" variant="secondary" className="h-8 w-8" onClick={zoomIn}>
              <Plus className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="secondary" className="h-8 w-8" onClick={zoomOut}>
              <Minus className="w-4 h-4" />
            </Button>
          </div>

          <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-muted-foreground">
            Tap the map to drop a pin
          </div>
        </div>

        <div className="p-4 space-y-3 border-t border-border">
          <Button variant="outline" className="w-full" onClick={handleGetCurrentLocation} disabled={isLocating}>
            <Navigation className="w-4 h-4 mr-2" />
            {isLocating ? "Getting Location..." : "Use Current Location (Full Zoom)"}
          </Button>

          {selectedPosition && (
            <p className="text-sm text-muted-foreground text-center">
              Selected: {selectedPosition.lat.toFixed(6)}, {selectedPosition.lng.toFixed(6)}
            </p>
          )}

          <Button className="w-full" onClick={handleConfirmLocation} disabled={!selectedPosition}>
            Confirm Location
          </Button>
        </div>
      </div>
    </div>
  );
}
