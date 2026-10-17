export interface User {
    name: string,
    age: number,
    avatar: string,
    status: boolean,
    job: string,
    phone: number,
    id: number
}

export interface initialstate {
    data: User[],
    loading: boolean,
    error: any
}