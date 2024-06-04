export interface Release {
    id: number;
    title: string;
    artist: string;
    cover: string;
    preview: string;
    userID: number;
    slug: string;
    platforms: Platform[]
}

export interface Platform {
    id: number;
    name: string,
    logoUrl: string,
    actionVerb: string,
    url: string | null,
    visibility: boolean
}