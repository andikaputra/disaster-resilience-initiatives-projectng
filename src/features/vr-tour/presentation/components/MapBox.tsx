import { Layer, Map, MapRef, Marker, Source } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import { Fragment, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { LngLatLike } from 'mapbox-gl';
import { FaLocationDot, FaVrCardboard } from 'react-icons/fa6';
import { Box, Button, Flex, Overlay, Space, Title, useMatches } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { Simulation360Entity } from '@/src/shared/domain/entities';
import { usePageProps } from '@/src/shared/presentations/contexts';
import { useMapBoxVrTourPageContext } from '../contexts';

type MarkerStartPositionPointProps = {
  title?: string;
  lontLatLike?: LngLatLike;
  onMarkerClick?: (value: any) => void;
  onButtonClick?: () => void;
};

const MarkerStartPositionPoint: React.FC<MarkerStartPositionPointProps> = ({
  onMarkerClick,
  onButtonClick,
  lontLatLike,
  title,
}) => {
  const { hovered, ref } = useHover<any>();
  const { isHidePopUp } = useMapBoxVrTourPageContext();
  return (
    <Marker
      onClick={() => {
        onMarkerClick?.(lontLatLike);
      }}
      style={{
        cursor: 'pointer',
        zIndex: hovered ? 1000 : 0,
      }}
      longitude={(lontLatLike as any).lon}
      latitude={(lontLatLike as any).lat}
    >
      <Flex ref={ref} align="center" justify="center" gap={10} style={{ position: 'relative' }}>
        <Box
          style={{
            transition: `all .${Math.floor(Math.random() * 5)}s ease-in-out`,
            transitionBehavior: 'allow-discrete',
            width: hovered || isHidePopUp ? 50 : 30,
            height: hovered || isHidePopUp ? 50 : 30,
            position: 'relative',
          }}
        >
          <Image
            src="/images/mapbox-icons/start-point.png"
            alt="start-point"
            style={{ objectFit: 'contain' }}
            fill
          />
        </Box>
        <Box
          style={{
            position: 'absolute',
            left: 50,
            minWidth: 180,
            transition: `all .${Math.floor(Math.random() * 5)}s ease-in-out`,
            transitionBehavior: 'allow-discrete',
            transform: isHidePopUp || hovered ? 'scale(1)' : 'scale(0)',
          }}
        >
          <Space w={5} />
          <Box
            style={{
              position: 'relative',
              borderRadius: 10,
              padding: 10,
              overflow: 'hidden',
            }}
          >
            <Overlay color="#000" backgroundOpacity={0.35} blur={5} style={{ zIndex: -1 }} />
            <Flex direction="column">
              <Title
                order={6}
                style={{
                  color: 'white',
                  textTransform: 'capitalize',
                }}
              >
                {title}
              </Title>
              <Space h={5} />
              {onButtonClick && (
                <Button
                  leftSection={<FaVrCardboard />}
                  style={{
                    borderRadius: 10,
                  }}
                  onClick={() => onButtonClick?.()}
                >
                  Akses VR 360
                </Button>
              )}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Marker>
  );
};

type MarkerTemporarySavePointPositionProps = {
  title?: string;
  lontLatLike?: LngLatLike;
  onMarkerClick?: (value: any) => void;
};

const MarkerTemporarySavePointPosition: React.FC<MarkerTemporarySavePointPositionProps> = ({
  onMarkerClick,
  lontLatLike,
  title,
}) => {
  const { hovered, ref } = useHover<any>();
  const { isHidePopUp } = useMapBoxVrTourPageContext();
  return (
    <Marker
      onClick={() => {
        onMarkerClick?.(lontLatLike);
      }}
      style={{
        cursor: 'pointer',
      }}
      longitude={(lontLatLike as any).lon}
      latitude={(lontLatLike as any).lat}
    >
      <Flex ref={ref} align="center" justify="center" gap={10} style={{ position: 'relative' }}>
        <Box
          style={{
            transition: `all .${Math.floor(Math.random() * 5)}s ease-in-out`,
            transitionBehavior: 'allow-discrete',
            width: hovered || isHidePopUp ? 50 : 30,
            height: hovered || isHidePopUp ? 50 : 30,
            position: 'relative',
          }}
        >
          <Image
            src="/images/mapbox-icons/temporary-save-point.png"
            alt="start-point"
            style={{ objectFit: 'contain' }}
            fill
          />
        </Box>
        <Box
          style={{
            position: 'absolute',
            left: 70,
            transition: 'all .3s ease-in-out',
            transitionBehavior: 'allow-discrete',
            transform: hovered ? 'scale(1.1)' : 'scale(0)',
          }}
        >
          <Space w={5} />
          <Box
            style={{
              position: 'relative',
              borderRadius: 10,
              padding: 10,
              minWidth: 200,
              overflow: 'hidden',
            }}
          >
            <Overlay color="#000" backgroundOpacity={0.35} blur={5} style={{ zIndex: -1 }} />
            <Flex direction="column">
              <Title
                order={6}
                style={{
                  color: 'white',
                  textTransform: 'capitalize',
                }}
              >
                {title}
              </Title>
              <Space h={5} />
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Marker>
  );
};

type MarkerSavePointPositionProps = {
  title?: string;
  lontLatLike?: LngLatLike;
  onMarkerClick?: (value: any) => void;
};

const MarkerSavePointPosition: React.FC<MarkerSavePointPositionProps> = ({
  onMarkerClick,
  lontLatLike,
  title,
}) => {
  const { hovered, ref } = useHover<any>();
  const { isHidePopUp } = useMapBoxVrTourPageContext();
  return (
    <Marker
      onClick={() => {
        onMarkerClick?.(lontLatLike);
      }}
      style={{
        cursor: 'pointer',
      }}
      longitude={(lontLatLike as any).lon}
      latitude={(lontLatLike as any).lat}
    >
      <Flex ref={ref} align="center" justify="center" gap={10} style={{ position: 'relative' }}>
        <Box
          style={{
            transition: `all .${Math.floor(Math.random() * 5)}s ease-in-out`,
            transitionBehavior: 'allow-discrete',
            width: hovered || isHidePopUp ? 50 : 30,
            height: hovered || isHidePopUp ? 50 : 30,
            position: 'relative',
          }}
        >
          <Image
            src="/images/mapbox-icons/save-point.png"
            alt="start-point"
            style={{ objectFit: 'contain' }}
            fill
          />
        </Box>
        <Box
          style={{
            position: 'absolute',
            left: 70,
            transition: 'all .3s ease-in-out',
            transitionBehavior: 'allow-discrete',
            transform: hovered ? 'scale(1.1)' : 'scale(0)',
          }}
        >
          <Space w={5} />
          <Box
            style={{
              position: 'relative',
              borderRadius: 10,
              padding: 10,
              minWidth: 200,
              overflow: 'hidden',
            }}
          >
            <Overlay color="#000" backgroundOpacity={0.35} blur={5} style={{ zIndex: -1 }} />
            <Flex direction="column">
              <Title
                order={6}
                style={{
                  color: 'white',
                  textAlign: 'center',
                  textTransform: 'capitalize',
                }}
              >
                {title}
              </Title>
              <Space h={5} />
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Marker>
  );
};

type MarkerRegionProps = {
  title?: string;
  lontLatLike?: LngLatLike;
  onMarkerClick?: (value: any) => void;
};

const MarkerRegion: React.FC<MarkerRegionProps> = ({ lontLatLike, title, onMarkerClick }) => (
  <Marker
    style={{
      cursor: 'pointer',
      zIndex: 9999,
    }}
    onClick={() => {
      onMarkerClick?.(lontLatLike);
    }}
    longitude={(lontLatLike as any).lon}
    latitude={(lontLatLike as any).lat}
  >
    <Flex align="center" justify="center" gap={10} style={{ position: 'relative' }}>
      <Box
        style={{
          position: 'absolute',
          left: 30,
          transition: 'all .3s ease-in-out',
          transitionBehavior: 'allow-discrete',
        }}
      >
        <Space w={5} />
        <Box
          style={{
            position: 'relative',
            borderRadius: 10,
            padding: 10,
            minWidth: 200,
            overflow: 'hidden',
          }}
        >
          <Overlay color="#000" backgroundOpacity={0.35} blur={5} style={{ zIndex: -1 }} />
          <Flex direction="column">
            <Title
              order={6}
              style={{
                color: 'white',
                textTransform: 'capitalize',
                textAlign: 'center',
              }}
            >
              {title}
            </Title>
            <Space h={5} />
          </Flex>
        </Box>
      </Box>
      <FaLocationDot size={30} style={{ position: 'absolute' }} />
    </Flex>
  </Marker>
);

export default function MapBox() {
  const mapRef = useRef<MapRef>();
  const urlPaths = useRouter().asPath.split('/');
  const slug = urlPaths.at(-1);
  const matchesMaxZoom = useMatches({
    base: 16,
  });
  const router = useRouter();
  const onClick = useCallback(async (event: LngLatLike) => {
    const option = {
      padding: 120,
      duration: 2000,
      animate: true,
      zoom: 16,
      bearing: Math.floor(Math.random() * 360),
      pitch: Math.floor(Math.random() * 50),
    };
    mapRef?.current?.fitBounds(
      [
        [(event as any)?.lon, (event as any)?.lat],
        [(event as any)?.lon, (event as any)?.lat],
      ],
      option
    );
  }, []);
  const { data } = usePageProps<Simulation360Entity>();
  const { setIsHidePopUp } = useMapBoxVrTourPageContext();
  return (
    <div
      style={{
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
      }}
    >
      <Map
        ref={mapRef as any}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
        maxZoom={matchesMaxZoom}
        initialViewState={{
          longitude: Number(data?.village?.at(0)?.longitude) ?? 114.622389,
          latitude: Number(data?.village?.at(0)?.latitude) ?? -8.402109,
          zoom: 14,
        }}
        onZoom={(value) => {
          const { zoom } = value.viewState;
          if (zoom > 14) {
            setIsHidePopUp(true);
          } else if (zoom <= 14) {
            setIsHidePopUp(false);
          }
        }}
        terrain={{
          source: 'mapbox-raster-dem',
          exaggeration: 2,
        }}
        style={{ width: '100dvw', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      >
        {data?.village?.map((village, villageIndex) => (
          <Fragment key={`village-id-${village.id}-${villageIndex}`}>
            <MarkerRegion
              title={village?.village ?? ''}
              lontLatLike={
                {
                  lon: Number(village?.longitude ?? 0),
                  lat: Number(village?.latitude ?? 0),
                } satisfies LngLatLike
              }
              key={villageIndex}
              onMarkerClick={onClick}
            />
            {village?.mapbox_collection
              ?.filter((mapBoxCollection) => mapBoxCollection.type === 'titik-awal')
              ?.map((mapBoxCollection, mapBoxCollectionIndex) => (
                <Fragment
                  key={`marker-start-point-${mapBoxCollection.id}-${mapBoxCollectionIndex}`}
                >
                  <MarkerStartPositionPoint
                    title={mapBoxCollection.name}
                    onButtonClick={
                      mapBoxCollection?.vr_url
                        ? () =>
                            router.push(
                              `/vr-tour/frame/${slug}/${village.slug}/${mapBoxCollection.id}`
                            )
                        : undefined
                    }
                    lontLatLike={
                      {
                        lon: Number(mapBoxCollection?.longitude ?? 0),
                        lat: Number(mapBoxCollection?.latitude ?? 0),
                      } satisfies LngLatLike
                    }
                    onMarkerClick={onClick}
                  />
                  <Source
                    id={`polylineLayer-${mapBoxCollection.id}`}
                    type="geojson"
                    data={{
                      type: 'Feature',
                      properties: {},
                      geometry: {
                        type: 'LineString',
                        coordinates: mapBoxCollection.region_detail_mapbox_list?.reduce(
                          (accumulator, curValue, index) => {
                            if (index === 0) {
                              accumulator.push([
                                Number(curValue.longitude ?? 0),
                                Number(curValue.latitude ?? 0),
                              ]);
                            } else {
                              accumulator.push([
                                Number(curValue.longitude ?? 0),
                                Number(curValue.latitude ?? 0),
                              ]);
                            }
                            return accumulator;
                          },
                          [] as Array<Array<number>>
                        ),
                      },
                    }}
                  >
                    <Layer
                      id={mapBoxCollection.id}
                      type="line"
                      source="lineString"
                      layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                      }}
                      paint={{
                        'line-color': '#32de84',
                        'line-width': 5,
                      }}
                    />
                  </Source>
                </Fragment>
              ))}
            {village?.mapbox_collection
              ?.filter((mapBoxCollection) => mapBoxCollection.type === 'titik-akhir')
              ?.map((mapBoxCollection, mapBoxCollectionIndex) => (
                <Fragment key={`marker-end-point-${mapBoxCollection.id}-${mapBoxCollectionIndex}`}>
                  <MarkerSavePointPosition
                    title={mapBoxCollection.name}
                    lontLatLike={
                      {
                        lon: Number(mapBoxCollection?.longitude ?? 0),
                        lat: Number(mapBoxCollection?.latitude ?? 0),
                      } satisfies LngLatLike
                    }
                    onMarkerClick={onClick}
                  />
                </Fragment>
              ))}
            {village?.mapbox_collection
              ?.filter((mapBoxCollection) => mapBoxCollection.type === 'titik-sementara')
              ?.map((mapBoxCollection, mapBoxCollectionIndex) => (
                <Fragment
                  key={`marker-temprary-point-${mapBoxCollection.id}-${mapBoxCollectionIndex}`}
                >
                  <MarkerTemporarySavePointPosition
                    title={mapBoxCollection.name}
                    lontLatLike={
                      {
                        lon: Number(mapBoxCollection?.longitude ?? 0),
                        lat: Number(mapBoxCollection?.latitude ?? 0),
                      } satisfies LngLatLike
                    }
                    onMarkerClick={onClick}
                  />
                </Fragment>
              ))}
          </Fragment>
        ))}
        <Source
          id="mapbox-raster-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize="512"
        />
      </Map>
    </div>
  );
}
