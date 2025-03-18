export default interface SimulationPlacesEntity {
    success: boolean
    http_status: number
    meta: Meta
    data: Data
}

export interface Meta {
    message: string
    error: any[]
}

export interface Data {
    pageInfo: PageInfo
    nodes: Node[]
}

export interface PageInfo {
    all: number
    active: number
    deactive: number
}

export interface Node {
    id: string
    slug: string
    province: string
    regency: string
    is_active: boolean
    created_at: string
    updated_at: string
    deleted_at: any
    wallpaper: string
    assets: Asset[]
    existing_apps: ExistingApp[]
}

export interface Asset {
    id: string
    asset_path: string
    asset_alt: any
    asset_url: string
}

export interface ExistingApp {
    id: string
    code: string
    display: string
    pivot: Pivot
}

export interface Pivot {
    region_id: string
    existing_app_id: string
}
