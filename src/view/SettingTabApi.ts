import YoutubePlugin from "src/YoutubePlugin";
import { createNotice } from "src/helper/NoticeHelper";
import {
	PluginSettingTab,
	App,
	Setting,
	Notice,
	Platform,
} from "obsidian";
import { LoginGoogle, StartLoginGoogleMobile } from "../googleApi/GoogleAuth";
import { getRefreshToken, setAccessToken, setExpirationTime, setRefreshToken } from "../helper/LocalStorage";
import { OAuthAlertModal } from "../modal/OAuthAlertModal";

export class SettingTabGoogleApi extends PluginSettingTab {
	plugin: YoutubePlugin;
	constructor(app: App, plugin: YoutubePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		const isLoggedIn = getRefreshToken();

		// Heading and description
		containerEl.empty();
		containerEl.createEl("h2", { text: "Settings for Youtube Plugin" });
		containerEl.createEl("h4", { text: "Please restart Obsidian to let changes take effect" })
		const clientDesc = document.createDocumentFragment();
		clientDesc.append(
			"Use own authentication client",
			clientDesc.createEl("br"),
			"Check the ",
			clientDesc.createEl("a", {
				href: "https://yukigasai.github.io/obsidian-google-calendar/#/Basics/Installation", // TODO: Change to own documentation
				text: "documentation",
			}),
			" to find out how to create a own client."
		);

		// Google Auth Settings
		new Setting(containerEl)
			.setName("Use own authentication client")
			.setDesc(clientDesc)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.useCustomClient)
					.onChange(async (value) => {
						setRefreshToken("");
						setAccessToken("");
						setExpirationTime(0);
						if (value === false) {
							new OAuthAlertModal(app).open();
						}
						this.plugin.settings.useCustomClient = value;
						await this.plugin.saveSettings();
						this.display();
					})
			);

		if (this.plugin.settings.useCustomClient) {

			new Setting(containerEl)
				.setName("ClientId")
				.setDesc("Google client id")
				.setClass("SubSettings")
				.addText((text) =>
					text
						.setPlaceholder("Enter your client id")
						.setValue(this.plugin.settings.googleClientId)
						.onChange(async (value) => {
							this.plugin.settings.googleClientId = value.trim();
							await this.plugin.saveSettings();
						})
				);

			new Setting(containerEl)
				.setName("ClientSecret")
				.setDesc("Google client secret")
				.setClass("SubSettings")
				.addText((text) =>
					text
						.setPlaceholder("Enter your client secret")
						.setValue(this.plugin.settings.googleClientSecret)
						.onChange(async (value) => {
							this.plugin.settings.googleClientSecret = value.trim();
							await this.plugin.saveSettings();
						})
				);
		} else {

			new Setting(containerEl)
				.setName("Server url")
				.setDesc("The url to the server where the oauth takes place")
				.setClass("SubSettings")
				.addText(text => {
					text
						.setValue(this.plugin.settings.googleOAuthServer)
						.onChange(async (value) => {
							this.plugin.settings.googleOAuthServer = value.trim();
							await this.plugin.saveSettings();
						})
				})

		}

		new Setting(containerEl)
			.setName("Login with google")
			.addButton(button => {
				button
					.setButtonText(isLoggedIn ? "Logout" : "Login")
					.onClick(() => {
						if (isLoggedIn) {
							setRefreshToken("");
							setAccessToken("");
							setExpirationTime(0);
							this.hide();
							this.display();
						} else {
							if (Platform.isMobileApp) {
								if (this.plugin.settings.useCustomClient) {
									StartLoginGoogleMobile();
								} else {
									window.open(`${this.plugin.settings.googleOAuthServer}/api/google`)
								}
							} else {
								LoginGoogle()
							}
						}
					})
			})

		new Setting(containerEl)
			.setName("Refresh Interval")
			.setDesc("Time in seconds between refresh request from google server")
			.addSlider(cb => {
				cb.setValue(this.plugin.settings.refreshInterval)
				cb.setLimits(this.plugin.settings.useCustomClient ? 10 : 60, 360, 1);
				cb.setDynamicTooltip();
				cb.onChange(async value => {
					if (value < 60 && !this.plugin.settings.useCustomClient) return;
					this.plugin.settings.refreshInterval = value;
					await this.plugin.saveSettings();
				})
			});
		
	}
}

export function settingsAreComplete(plugin: YoutubePlugin): boolean {
    if (
        plugin.settings.useCustomClient && (
            plugin.settings.googleClientId == "" ||
            plugin.settings.googleClientSecret == ""
        )
    ) {
        createNotice("Google Calendar missing settings");
        return false;
    }
    return true;
}

export function settingsAreCorret(): boolean {
	if (
		/^[0-9a-zA-z-]*\.apps\.googleusercontent\.com$/.test(
			this.plugin.settings.googleClientId
		) == false
	) {
		new Notice("Client ID Token is not the correct format");
		return false;
	} else if (
		/^[0-9a-zA-z-]*$/.test(this.plugin.settings.googleClientSecret) == false
	) {
		new Notice("Client Secret is not the correct format");
		return false;
	}
	return true;
}

export function settingsAreCompleteAndLoggedIn(): boolean {

	if (!getRefreshToken() || getRefreshToken() == "") {
		createNotice(
			"Google Calendar missing settings or not logged in"
		);
		return false;
	}
	return true;
}
