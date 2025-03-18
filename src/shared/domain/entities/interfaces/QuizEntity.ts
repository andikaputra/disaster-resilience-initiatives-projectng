export default interface QuizEntity {
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
    name?: string
    email?: string
    phone_no?: string
    sex_type?: string
    quiz_code?: string
    age?: string
    work?: string
    id?: string
    updated_at?: string
    created_at?: string
}
