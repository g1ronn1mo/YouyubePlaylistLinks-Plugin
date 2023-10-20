/**
 * This file contains all custom types defined to work with typescript
 */
export interface PluginSettings {
	// Authentication settings
	googleClientId:string
	googleClientSecret:string
	googleRefreshToken:string
	googleOAuthServer:string
	refreshInterval:number
	useCustomClient: boolean

	// Youtube settings
	youtubePlaylist : string
	youtubePlaylists: string[ ] 
	apiKey: string,
}


export interface ApiRequestData {
    url: string;
    method: string;
    body?: any;
}

export interface Template {
    name: string,
    insertType: string,
    playlistList: string[], //Names of Playlists
}


