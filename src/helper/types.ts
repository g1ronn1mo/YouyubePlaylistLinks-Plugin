/**
 * This file contains all custom types defined to work with typescript
 * Most types come from the Yputube API 
 */

export interface YoutubePluginSettings {
    // Authentication settings
	useCustomClient: boolean;
    googleOAuthServer: string;
    googleClientId: string;
    googleClientSecret: string;
    googleRefreshToken: string;
	
    // Notification settings
    useNotification: boolean;
	showNotice: boolean;
	
    // Event note settings
    eventNoteNameFormat: string;
    optionalNotePrefix: string;
    defaultTemplate: string;
	defaultFolder: string;
    autoCreateEventNotes: boolean;
		autoCreateEventNotesMarker: string;
        autoCreateEventKeepOpen: boolean;
        importStartOffset: number;
        importEndOffset: number;

    // General settings
    refreshInterval: number;
    atAnnotationEnabled: boolean;
    debugMode: boolean;
    }


    export interface ApiRequestData {
        url: string;
        method: string;
        body?: any;
    }
    