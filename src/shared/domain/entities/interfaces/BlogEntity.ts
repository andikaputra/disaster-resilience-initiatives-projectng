export default interface BlogEntity {
    success?: boolean
    http_status?: number
    meta?: Meta
    data?: Data
}

interface Meta {
    message?: string
    error?: any[]
}

interface Data {
    pageInfo?: PageInfo
    nodes?: Node[]
}

interface PageInfo {
    all?: number
    active?: number
    deactive?: number
}

interface Node {
    id?: string
    slug?: string
    title?: string
    sub_title?: string
    content?: string
    is_active?: boolean
    is_general_blog?: boolean
    created_at?: string
    updated_at?: string
    wallpaper?: string
}
