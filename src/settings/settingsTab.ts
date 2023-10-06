import { App, PluginSettingTab, Setting  }  from 'obsidian' 
import YouyubePlaylist from '../main';

export class SampleSettingTab extends PluginSettingTab {
	plugin: YouyubePlaylist;

	constructor(app: App, plugin: YouyubePlaylist) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void { 
		const containerEl = this.containerEl;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Settings for youtube plalist links plugin.' });

		const watchListSetting = new Setting(containerEl);
		watchListSetting.setName('YouyubePlaylist');
		watchListSetting.setDesc('Enter the Youtube playlist link you want to embed');
		watchListSetting.addText(text => {
			text.setPlaceholder('Enter Youtube playlist');
			text.setValue(this.plugin.settings.youtubePlaylist);
			text.onChange(async (value) => {
				this.plugin.settings.youtubePlaylist = value;
				await this.plugin.saveSettings();
			});
		});
		const APIKeySetting = new Setting(containerEl);
		APIKeySetting.setName('API Key');
		APIKeySetting.setDesc('Enter your Youtube API key');
		APIKeySetting.addText(text => {
			text.setPlaceholder('Enter API key');
			text.setValue(this.plugin.settings.apiKey);
			text.onChange(async (value) => {
				this.plugin.settings.apiKey = value;
				await this.plugin.saveSettings();
			});
		});
	}
}
