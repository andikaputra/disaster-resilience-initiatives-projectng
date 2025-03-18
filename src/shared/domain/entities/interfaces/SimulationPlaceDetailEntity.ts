export default interface SimulationPlaceDetailEntity {
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
    id?: string
    slug?: string
    province?: string
    regency?: string
    is_active?: boolean
    created_at?: string
    updated_at?: string
    deleted_at?: any
    wallpaper?: string
    assets?: Asset[]
    announcement?: Announcement
    quiz?: Quiz
    blog?: Blog
    useful_link?: UsefulLink[]
    social_media?: SocialMedum[]
    gallery?: Gallery
    village?: Village[]
    existing_apps?: ExistingApp[]
    seos?: Seo[]
}

export interface Asset {
    id?: string
    asset_path?: string
    asset_alt?: any
    asset_url?: string
}

export interface Announcement {
    id?: string
    name?: string
    announcement_link?: string
    is_active?: boolean
    created_at?: string
    updated_at?: string
}

export interface Quiz {
    id?: string
    name?: string
    quiz_link?: string
    is_active?: boolean
    created_at?: string
    updated_at?: string
}

export interface Blog {
    pageInfo?: PageInfo
    nodes?: NodeDetail[]
}

export interface PageInfo {
    all?: number
    active?: number
    deactive?: number
}

export interface NodeDetail {
    id?: string
    slug?: string
    title?: string
    sub_title?: string
    content?: string
    is_active?: boolean
    created_at?: string
    updated_at?: string
    wallpaper?: string
}

export interface UsefulLink {
    id?: string
    url?: string
    display?: string
    is_active?: boolean
    icon?: string
}

export interface SocialMedum {
    id?: string
    url?: string
    display?: string
    is_active?: boolean
    icon?: string
}

export interface Gallery {
    id?: string
    is_active?: boolean
    assets?: Asset2[]
}

export interface Asset2 {
    id?: string
    asset_path?: string
    asset_alt?: any
    asset_url?: string
}

export interface Village {
    id?: string
    slug?: string
    village?: string
    is_active?: boolean
    created_at?: string
    updated_at?: string
}

export interface ExistingApp {
    id?: string
    code?: string
    display?: string
    pivot?: Pivot
}

export interface Pivot {
    region_id?: string
    existing_app_id?: string
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
