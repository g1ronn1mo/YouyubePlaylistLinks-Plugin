import { Notice, Plugin } from 'obsidian';
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
	coreTemplatePlugin: any;
	templaterPlugin: any;


	private static instance: YouyubePlugin;
	public static getInstance(): YouyubePlugin {
		return YouyubePlugin.instance;
	}


	async onload() {
		YouyubePlugin.instance = this;
		this.api = new PluginApi();
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingTabGoogleApi(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

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
