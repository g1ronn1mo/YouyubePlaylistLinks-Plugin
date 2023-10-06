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

		const setting = new Setting(containerEl);
		setting.setName('YouyubePlaylist');
		setting.setDesc('Enter the Youtube playlist link you want to embed');
		setting.addText(text => {
			text.setPlaceholder('Enter Youtube playlist');
			text.setValue(this.plugin.settings.mySetting);
			text.onChange(async (value) => {
				this.plugin.settings.mySetting = value;
				await this.plugin.saveSettings();
		});
		});
	}
}
