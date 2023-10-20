export type AllPlaylists = {
    [playlistName: string]: YouTubeVideo[];
};


export type PlaylistListResponse = {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: YouTubePlaylist[];
}

export type VideoListResponse = {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: YouTubeVideo[];
}

export type YouTubeVideo = {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
    defaultAudioLanguage?: string;
    tags?: string[];
    categoryId?: string;
    liveBroadcastContent?: string;
}

type YouTubePlaylist = {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
}

type Snippet = {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    localized: Localized;
}

type Thumbnails = {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
}

type Thumbnail = {
    url: string;
    width: number;
    height: number;
}

type Localized = {
    title: string;
    description: string;
}

type PageInfo = {
    totalResults: number;
    resultsPerPage: number;
}
