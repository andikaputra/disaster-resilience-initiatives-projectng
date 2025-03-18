export default interface Simulation360Entity {
    success?: boolean
    http_status?: number
    meta?: Meta
    data?: Data
}

export interface Meta {
    message?: string
    error?: any[]
}

export interface Data {
    village?: Village[]
    about?: About
    disaster_mitigation_info?: string
    seo?: Seo[]
}

export interface Village {
    id?: string
    slug?: string
    village?: string
    latitude?: string
    longitude?: string
    map_url?: string
    is_active?: boolean
    created_at?: string
    updated_at?: string
    mapbox_collection?: MapboxCollection[]
}

export interface MapboxCollection {
    id?: string
    name?: string
    latitude?: string
    longitude?: string
    map_url?: any
    is_active?: boolean
    is_drone?: boolean
    created_at?: string
    updated_at?: string
    type?: string
    vr_url?: string
    vr_youtube_url?: string
    region_detail_mapbox_list?: RegionDetailMapboxList[]
}

export interface RegionDetailMapboxList {
    id?: string
    name?: string
    latitude?: string
    longitude?: string
    is_active?: boolean
    created_at?: string
    updated_at?: string
}

export interface About {
    intro_video_url?: any
    tutorial_video_url?: any
}

export interface Seo {
    id?: string
    meta_title?: string
    meta_description?: string
    meta_robot?: string
    meta_author?: string
    meta_keyword?: string
    meta_language?: string
    meta_og_title?: string
    meta_og_description?: string
    meta_og_url?: any
    meta_og_type?: string
    created_at?: string
    updated_at?: string
}
