import type { IPluginApi } from '../helper/ytTypes';
import { listAllPlaylists } from '../googleApi/GoogleListPlaylists';

export class PluginApi {

    constructor() {
    }
    
    public make(): IPluginApi {

        return {
            getAllPlaylists: () => listAllPlaylists() ,
        }
    }
}