import { LngLatLike } from 'mapbox-gl';

export type RegionCenter = {
    slug?: string;
    name?: string;
    longLat?: LngLatLike;
};

export type Polylines = {
    id?: string;
    name?: string;
    color?: string;
    coordinates: Array<Array<number>>
};

export type VrTourServerSideProps = {
    slug?: string;
    province?: string;
    region?: string;
    longLat?: LngLatLike;
    markerRegions?: RegionCenter[];
    markerStartPoints?: RegionCenter[];
    markerTemporarySavePoints?: RegionCenter[];
    markerSavePoints?: RegionCenter[];
    polylines?: Polylines[];
};
