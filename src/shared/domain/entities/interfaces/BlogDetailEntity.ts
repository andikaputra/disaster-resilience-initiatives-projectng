export default interface BlogDetailEntity {
    success?: boolean;
    http_status?: number;
    meta?: Meta;
    data?: Data;
}
interface Data {
    id?: string;
    slug?: string;
    title?: string;
    sub_title?: any;
    content?: string;
    is_active?: boolean;
    is_general_blog?: boolean;
    created_at?: string;
    updated_at?: string;
    wallpaper?: string;
    assets?: Asset[];
    tag?: string[];
    seos?: Seo[];
}
interface Seo {
    id?: string;
    meta_title?: string;
    meta_description?: string;
    meta_robot?: string;
    meta_author?: string;
    meta_keyword?: string;
    meta_language?: string;
    meta_og_title?: string;
    meta_og_description?: string;
    meta_og_url?: any;
    meta_og_type?: string;
    created_at?: string;
    updated_at?: string;
}
interface Asset {
    id?: string;
    asset_path?: string;
    asset_alt?: any;
    asset_url?: string;
}
interface Meta {
    message?: string;
    error?: any[];
}
