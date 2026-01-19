import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import maplibregl, { type Map as MapLibreMap, type Marker as MapLibreMarker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Navigation,
  Search,
  Home,
  Building2,
  MapPinned,
  ChevronRight,
  Loader2,
  X,
  Plus,
  Minus,
  LocateFixed,
} from "lucide-react";

interface AddressData {
  address: string;
  landmark: string;
  city: string;
  pincode: string;
  latitude: number;
  longitude: number;
  addressType: "home" | "office" | "other";
}

interface AddressSelectorProps {
  initialData: AddressData;
  onAddressConfirm: (data: AddressData) => void;
}

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    postcode?: string;
    road?: string;
    suburb?: string;
  };
}

const DEFAULT_CENTER = { lat: 20.5937, lng: 78.9629 };
const DEFAULT_ZOOM = 4;
const LOCATED_ZOOM = 17;

export function AddressSelector({ initialData, onAddressConfirm }: AddressSelectorProps) {
  const [step, setStep] = useState<"search" | "map" | "details">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [addressData, setAddressData] = useState<AddressData>(initialData);
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(
    initialData.latitude && initialData.longitude 
      ? { lat: initialData.latitude, lng: initialData.longitude }
      : null
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markerRef = useRef<MapLibreMarker | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const savedAddresses = [
    { type: "home" as const, label: "Home", address: "Ghaziabad, Uttar Pradesh - 201009" },
    { type: "office" as const, label: "Office", address: "456, Business Park, Andheri East" },
  ];

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
    []
  );

  // Search addresses
  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&limit=5&addressdetails=1`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, handleSearch]);

  // Initialize map when in map step
  useEffect(() => {
    if (step !== "map" || !containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: style as any,
      center: selectedPosition 
        ? [selectedPosition.lng, selectedPosition.lat] 
        : [DEFAULT_CENTER.lng, DEFAULT_CENTER.lat],
      zoom: selectedPosition ? LOCATED_ZOOM : DEFAULT_ZOOM,
      maxZoom: 18,
      attributionControl: { compact: true },
    });

    mapRef.current = map;

    // Add marker if position exists
    if (selectedPosition) {
      markerRef.current = new maplibregl.Marker({ color: "#22c55e" })
        .setLngLat([selectedPosition.lng, selectedPosition.lat])
        .addTo(map);
    }

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      setSelectedPosition({ lat, lng });

      if (!markerRef.current) {
        markerRef.current = new maplibregl.Marker({ color: "#22c55e" })
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
  }, [step, style, selectedPosition]);

  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setSelectedPosition({ lat, lng });

        // Reverse geocode
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
          );
          const data = await response.json();
          
          setAddressData(prev => ({
            ...prev,
            address: data.display_name?.split(",").slice(0, 3).join(",") || "",
            city: data.address?.city || data.address?.town || data.address?.village || "",
            pincode: data.address?.postcode || "",
            latitude: lat,
            longitude: lng,
          }));
        } catch (error) {
          console.error("Reverse geocode error:", error);
        }

        setStep("map");
        setIsLocating(false);

        // Fly to location if map exists
        setTimeout(() => {
          const map = mapRef.current;
          if (map) {
            map.flyTo({ center: [lng, lat], zoom: LOCATED_ZOOM, essential: true });
            if (!markerRef.current) {
              markerRef.current = new maplibregl.Marker({ color: "#22c55e" })
                .setLngLat([lng, lat])
                .addTo(map);
            } else {
              markerRef.current.setLngLat([lng, lat]);
            }
          }
        }, 100);
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSearchResultSelect = async (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    
    setSelectedPosition({ lat, lng });
    setAddressData(prev => ({
      ...prev,
      address: result.display_name.split(",").slice(0, 3).join(","),
      city: result.address?.city || result.address?.town || result.address?.village || "",
      pincode: result.address?.postcode || "",
      latitude: lat,
      longitude: lng,
    }));
    setSearchQuery("");
    setSearchResults([]);
    setStep("map");
  };

  const handleSavedAddressSelect = (saved: typeof savedAddresses[0]) => {
    setAddressData(prev => ({
      ...prev,
      addressType: saved.type,
      address: saved.address,
    }));
    setStep("details");
  };

  const handleConfirmMapLocation = async () => {
    if (!selectedPosition) return;

    // Reverse geocode if address not set
    if (!addressData.address) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedPosition.lat}&lon=${selectedPosition.lng}&addressdetails=1`
        );
        const data = await response.json();
        
        setAddressData(prev => ({
          ...prev,
          address: data.display_name?.split(",").slice(0, 3).join(",") || "",
          city: data.address?.city || data.address?.town || data.address?.village || "",
          pincode: data.address?.postcode || "",
          latitude: selectedPosition.lat,
          longitude: selectedPosition.lng,
        }));
      } catch (error) {
        console.error("Reverse geocode error:", error);
      }
    }

    setStep("details");
  };

  const zoomIn = () => mapRef.current?.zoomIn();
  const zoomOut = () => mapRef.current?.zoomOut();

  const relocate = () => {
    const map = mapRef.current;
    if (map && selectedPosition) {
      map.flyTo({ center: [selectedPosition.lng, selectedPosition.lat], zoom: LOCATED_ZOOM, essential: true });
    }
  };

  return (
    <div className="space-y-4">
      {/* Step: Search */}
      {step === "search" && (
        <div className="animate-fade-in">
          {/* Use Current Location Button */}
          <button
            onClick={handleGetCurrentLocation}
            disabled={isLocating}
            className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              {isLocating ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              ) : (
                <Navigation className="w-5 h-5 text-primary" />
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-foreground">Use current location</p>
              <p className="text-sm text-muted-foreground">Using GPS</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Search Input */}
          <div className="relative mt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for area, street name..."
              className="pl-12 h-12 rounded-xl"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Search Results */}
          {isSearching && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="mt-2 border border-border rounded-xl overflow-hidden divide-y divide-border">
              {searchResults.map((result) => (
                <button
                  key={result.place_id}
                  onClick={() => handleSearchResultSelect(result)}
                  className="w-full flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
                >
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">
                      {result.display_name.split(",")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {result.display_name.split(",").slice(1, 4).join(",")}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Saved Addresses */}
          {searchResults.length === 0 && !isSearching && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Saved Addresses
              </h4>
              <div className="space-y-2">
                {savedAddresses.map((saved, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSavedAddressSelect(saved)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      {saved.type === "home" ? (
                        <Home className="w-5 h-5 text-primary" />
                      ) : (
                        <Building2 className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-foreground">{saved.label}</p>
                      <p className="text-sm text-muted-foreground truncate">{saved.address}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add New Address */}
          <button
            onClick={() => setStep("map")}
            className="w-full flex items-center gap-3 p-3 mt-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <MapPinned className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-foreground">Add new address</p>
              <p className="text-sm text-muted-foreground">Pick location on map</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Step: Map */}
      {step === "map" && (
        <div className="animate-fade-in">
          <div className="relative h-64 rounded-xl overflow-hidden border border-border">
            <div ref={containerRef} className="absolute inset-0" />

            {/* Center Pin (Always visible) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10">
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-primary drop-shadow-lg" />
                <div className="w-2 h-2 bg-primary rounded-full -mt-1" />
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute right-3 top-3 flex flex-col gap-1 z-10">
              <Button size="icon" variant="secondary" className="h-8 w-8 shadow-md" onClick={zoomIn}>
                <Plus className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="secondary" className="h-8 w-8 shadow-md" onClick={zoomOut}>
                <Minus className="w-4 h-4" />
              </Button>
            </div>

            {/* Relocate Button */}
            <Button
              size="sm"
              variant="secondary"
              className="absolute bottom-3 right-3 shadow-md z-10"
              onClick={handleGetCurrentLocation}
              disabled={isLocating}
            >
              {isLocating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LocateFixed className="w-4 h-4" />
              )}
            </Button>

            {/* Instruction */}
            <div className="absolute bottom-3 left-3 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium shadow-md z-10">
              Move map to adjust pin
            </div>
          </div>

          {/* Selected Address Preview */}
          {addressData.address && (
            <div className="mt-3 p-3 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-foreground">{addressData.address}</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <Button variant="outline" onClick={() => setStep("search")} className="flex-1">
              Back
            </Button>
            <Button onClick={handleConfirmMapLocation} className="flex-1">
              Confirm Location
            </Button>
          </div>
        </div>
      )}

      {/* Step: Details */}
      {step === "details" && (
        <div className="animate-fade-in space-y-4">
          {/* Address Type */}
          <div className="flex gap-3">
            {[
              { type: "home" as const, icon: Home, label: "Home" },
              { type: "office" as const, icon: Building2, label: "Office" },
              { type: "other" as const, icon: MapPin, label: "Other" },
            ].map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => setAddressData(prev => ({ ...prev, addressType: type }))}
                className={`flex-1 p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  addressData.addressType === type
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* Complete Address */}
          <div>
            <label className="block text-sm font-medium mb-2">Complete Address *</label>
            <Input
              value={addressData.address}
              onChange={(e) => setAddressData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="House/Flat No., Building, Street"
              className="h-12 rounded-xl"
            />
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-sm font-medium mb-2">Landmark (Optional)</label>
            <Input
              value={addressData.landmark}
              onChange={(e) => setAddressData(prev => ({ ...prev, landmark: e.target.value }))}
              placeholder="Near landmark"
              className="h-12 rounded-xl"
            />
          </div>

          {/* City & Pincode */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <Input
                value={addressData.city}
                onChange={(e) => setAddressData(prev => ({ ...prev, city: e.target.value }))}
                placeholder="City"
                className="h-12 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pincode *</label>
              <Input
                value={addressData.pincode}
                onChange={(e) => setAddressData(prev => ({ ...prev, pincode: e.target.value }))}
                placeholder="Pincode"
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setStep("map")} className="flex-1">
              Change Location
            </Button>
            <Button
              onClick={() => onAddressConfirm(addressData)}
              disabled={!addressData.address || !addressData.city || !addressData.pincode}
              className="flex-1"
            >
              Confirm Address
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
