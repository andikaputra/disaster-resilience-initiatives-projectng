export type LandingPageServerSideProps = {
    success?: boolean
    http_status?: number
    meta?: {
        message?: string
        error?: Array<any>
    }
    data?: {
        pageInfo?: {
            all?: number
            active?: number
            deactive?: number
        }
        nodes?: Array<{
            id?: string
            slug?: string
            province?: string
            regency?: string
            is_active?: boolean
            created_at?: string
            updated_at?: string
            deleted_at?: any
            wallpaper?: string
            assets?: Array<{
                id?: string
                asset_path?: string
                asset_alt?: any
                asset_url?: string
            }>
            existing_apps?: Array<{
                id?: string
                code?: string
                display?: string
                pivot?: {
                    region_id?: string
                    existing_app_id?: string
                }
            }>
        }>
    }
}
