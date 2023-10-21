import { Plugin } from 'obsidian';
import {   SettingTabGoogleApi } from './view/SettingTabApi';
import type { PluginSettings } from './helper/types';
import {PluginApi} from './api/PluginApi';


const DEFAULT_SETTINGS: PluginSettings = {
	// Authentication settings
	googleClientId: "",
	googleClientSecret: "",
	googleRefreshToken: "",
	useCustomClient: true,
	googleOAuthServer: "https://obsidian-google-calendar.vercel.app",
	refreshInterval: 10,

	// Youtube settings
	youtubePlaylist : '',
	youtubePlaylists: [],  
	apiKey: '',
	
};


export default class YouyubePlugin extends Plugin {
	settings: PluginSettings;
	api: PluginApi;

	async onload() {
		console.log('loading plugn')

		this.api = new PluginApi();
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingTabGoogleApi(this.app, this));
	}

	onunload() {
		// Cleanup if any needed when plugin is unloaded
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}


}
