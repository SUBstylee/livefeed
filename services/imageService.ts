import { supabaseUrl } from '@/constants';
import { supabase } from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';

export const getUserImageSrc = (imagePath: string) => {
	if (imagePath) {
		return getSupabaseImageSrc(imagePath);
	} else {
		return require('../assets/images/defaultUser.png');
	}
};

export const getSupabaseImageSrc = (imagePath: string) => {
	if (imagePath) {
		return {
			uri: `${supabaseUrl}/storage/v1/object/public/uploads/${imagePath}`,
		};
	} else {
		return null;
	}
};

export const uploadFile = async (
	folderName: string,
	fileUri: any,
	isImage: true,
) => {
	try {
		let fileName = getFilePath(folderName, isImage);
		const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
			encoding: FileSystem.EncodingType.Base64,
		});
		let imageData = decode(fileBase64);
		let { data, error } = await supabase.storage
			.from('uploads')
			.upload(fileName, imageData, {
				cacheControl: '3600',
				upsert: false,
				contentType: isImage ? 'image/*' : 'video/*',
			});
		if (error) {
			console.log('File upload error: ', error);
			return { success: false, msg: (error as Error).message };
		}
		console.log('data: ', data);
		return { success: true, data: data?.path };
	} catch (error) {
		console.log('File upload error: ', error);
		return { success: false, msg: (error as Error).message };
	}
};

export const getFilePath = (folderName: string, isImage: true) => {
	return `${folderName}/${new Date().getTime()}${isImage ? '.png' : '.mp4'}`;
};
