import type {  PlaylistListResponse, VideoListResponse, AllPlaylists} from "../helper/ytTypes";

import { createNotice } from "src/helper/NoticeHelper";
import { callRequest } from "src/helper/RequestWrapper";
import { settingsAreCompleteAndLoggedIn, settingsAreComplete } from "../view/SettingTabApi";
import { GoogleApiError } from "./GoogleApiError";

/**
 * This functions get all playlists from the google API which were selected by the user and sortes them
 * @returns A List of Playlists
 */
export async function googleListAllPlaylists(): Promise<AllPlaylists>{

	// Create an object to store all playlists
	const allPlaylists: AllPlaylists = {};

	if (!settingsAreCompleteAndLoggedIn()) {
		if ( settingsAreComplete() ){
		// fetch liked videos
			await fetchLikedVideos(allPlaylists);
			return allPlaylists;
		} 

		throw new GoogleApiError("Not logged in", null, 401, {error: "Not logged in"})
	}

	// fetch all my pklaylists
	await fetchMyPlaylists(allPlaylists);

	return allPlaylists;
}

async function fetchMyPlaylists(allPlaylists: AllPlaylists) {
	const playlistsResponse: PlaylistListResponse = await callRequest(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=25&mine=true`, "GET", null);

	for (const playlist of playlistsResponse.items) {
		const playlistVideosResponse: VideoListResponse = await callRequest(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=${playlist.id}`, "GET", null);
		allPlaylists[playlist.snippet.title] = playlistVideosResponse.items;
	}
}

async function fetchLikedVideos(allPlaylists: AllPlaylists) {
	const likedVideosResponse: VideoListResponse = await callRequest(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&myRating=like`, "GET", null);
	allPlaylists["Liked Videos"] = likedVideosResponse.items;
}

export async function listAllPlaylists(): Promise<AllPlaylists|[]> {
	try {
		const playlists:AllPlaylists = await googleListAllPlaylists();
		return playlists;
	} catch(error) {
		switch (error.status) {
			case 401: break;
			case 999:
				createNotice(error.message)
				break;
			default:
				createNotice("Could not list YoutubePlaylists.");
				console.error('[Youtube]', error);
				break;
		}
		return [];
	}
}