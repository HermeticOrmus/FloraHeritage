import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import GlassCard from "@/components/GlassCard";
import DecorativeFrame from "@/components/DecorativeFrame";
import { MapPin, Coffee, Mountain, Waves, Store } from "lucide-react";

// Casa Del Puente coordinates in Boquete, Panama
const CASA_DEL_PUENTE_COORDS: [number, number] = [-82.42905447930899, 8.783454651241962];
const TOWN_CENTER_COORDS: [number, number] = [-82.4326, 8.7798]; // Downtown Boquete (8-min walk northeast)

export default function LocationMap() {
  const { t } = useTranslation();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const locationHighlights = [
    {
      icon: MapPin,
      title: t('location.property'),
      description: t('location.propertyDesc'),
      color: "text-casa-blue-deep"
    },
    {
      icon: Store,
      title: t('location.townCenter'),
      description: t('location.townDesc'),
      color: "text-hydrangea-deep"
    },
    {
      icon: Waves,
      title: t('location.riverside'),
      description: t('location.riversideDesc'),
      color: "text-casa-blue-medium"
    },
    {
      icon: Mountain,
      title: t('location.hiking'),
      description: t('location.hikingDesc'),
      color: "text-mountain-forest"
    },
    {
      icon: Coffee,
      title: t('location.coffee'),
      description: t('location.coffeeDesc'),
      color: "text-mountain-sage"
    }
  ];

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return; // Initialize map only once

    // Set Mapbox access token
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiaGVybWV0aWNvcm11cyIsImEiOiJjbWgyanRzMnkwZWRrMm1vZnhycGx0d3ZkIn0.Xd8MTIn8OjShUK4KQJAPDw';
    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: CASA_DEL_PUENTE_COORDS,
      zoom: 15,
      pitch: 30,
      bearing: 0,
      attributionControl: true
    });

    // Add error handler
    map.current.on('error', (e) => {
      console.error('Mapbox GL error:', e);
      console.log('Token being used:', mapboxToken.substring(0, 20) + '...');
    });

    // Log when style loads
    map.current.on('style.load', () => {
      console.log('Map style loaded successfully');
    });

    map.current.on('load', () => {
      setMapLoaded(true);

      if (!map.current) return;

      // Add custom markers
      // Casa Del Puente marker (main property)
      const casaEl = document.createElement('div');
      casaEl.className = 'custom-marker';
      casaEl.innerHTML = `
        <div class="w-12 h-12 bg-casa-blue-deep rounded-full flex items-center justify-center shadow-lg border-4 border-white cursor-pointer hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/>
            <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/>
          </svg>
        </div>
      `;

      new mapboxgl.Marker(casaEl)
        .setLngLat(CASA_DEL_PUENTE_COORDS)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="font-serif font-bold text-lg mb-1">Casa Del Puente</div>
              <div class="text-sm text-muted-foreground">Your Heritage Home</div>
            `)
        )
        .addTo(map.current);

      // Town center marker
      const townEl = document.createElement('div');
      townEl.className = 'custom-marker';
      townEl.innerHTML = `
        <div class="w-10 h-10 bg-hydrangea-deep rounded-full flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
      `;

      new mapboxgl.Marker(townEl)
        .setLngLat(TOWN_CENTER_COORDS)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="font-serif font-bold text-base mb-1">Boquete Town Center</div>
              <div class="text-sm text-muted-foreground">8-minute walk</div>
            `)
        )
        .addTo(map.current);

      // Add walking radius circle (8-minute walk ≈ 600m radius)
      map.current.addSource('walking-radius', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: CASA_DEL_PUENTE_COORDS
          },
          properties: {}
        }
      });

      map.current.addLayer({
        id: 'walking-radius-circle',
        type: 'circle',
        source: 'walking-radius',
        paint: {
          'circle-radius': {
            stops: [
              [0, 0],
              [20, 120] // Adjusted for visibility
            ],
            base: 2
          },
          'circle-color': '#4A90E2',
          'circle-opacity': 0.1,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#4A90E2',
          'circle-stroke-opacity': 0.3
        }
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <DecorativeFrame position="top">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('location.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('location.description')}
            </p>
          </DecorativeFrame>
        </div>

        {/* Map Container */}
        <div className="mb-12">
          <GlassCard className="p-0 overflow-hidden">
            <div
              ref={mapContainer}
              className="w-full h-[500px] md:h-[600px]"
              style={{ borderRadius: 'inherit' }}
            />
          </GlassCard>
        </div>

        {/* Location Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locationHighlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <GlassCard key={index} className="p-6 hover-elevate">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-casa-blue-light/20 to-hydrangea-soft/20 ${highlight.color}`}>
                    <IconComponent size={28} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Environment Variable Note */}
        {!mapLoaded && (
          <div className="mt-8 text-center">
            <GlassCard className="p-6 max-w-2xl mx-auto">
              <p className="text-muted-foreground text-sm">
                <strong>Note:</strong> To display the interactive map, add your Mapbox access token to the <code className="bg-muted px-2 py-1 rounded">VITE_MAPBOX_TOKEN</code> environment variable.
              </p>
              <p className="text-muted-foreground text-xs mt-2">
                Get your free token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-casa-blue-medium hover:underline">mapbox.com</a>
              </p>
            </GlassCard>
          </div>
        )}
      </div>
    </section>
  );
}
