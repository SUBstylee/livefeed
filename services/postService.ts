import { supabase } from '@/lib/supabase';
import { uploadFile } from './imageService';

export const createOrUpdatePost = async (post: any) => {
	try {
		if (post.file && typeof post.file == 'object') {
			let isImage = post?.file?.type?.includes('image');
			let folderName = isImage ? 'postImages' : 'postVideos';
			let fileResult = await uploadFile(folderName, post?.file?.uri, isImage);
			if (fileResult.success) post.file = fileResult.data;
			else return fileResult;
		}
		const { data, error } = await supabase
			.from('posts')
			.upsert(post)
			.select()
			.single();

		if (error) {
			console.log('create post error: ', error);
			return { success: false, msg: (error as Error).message };
		}
		return { success: true, data };
	} catch (error) {
		console.log('create post error: ', error);
		return { success: false, msg: (error as Error).message };
	}
};
export const fetchPosts = async (limit = 10) => {
	try {
		const { data, error } = await supabase
			.from('posts')
			.select(`*, user: users(id, name, image), postLikes(*)`)
			.order('created_at', { ascending: false })
			.limit(limit);
		if (error) {
			console.log('fetch post error: ', error);
			return { success: false, msg: (error as Error).message };
		}
		return { success: true, data };
	} catch (error) {
		console.log('fetch post error: ', error);
		return { success: false, msg: (error as Error).message };
	}
};

export const createPostLike = async (postLike: any) => {
	try {
		const { data, error } = await supabase
			.from('postLikes')
			.insert(postLike)
			.select()
			.single();
		if (error) {
			console.log('like post error: ', error);
			return { success: false, msg: (error as Error).message };
		}
		return { success: true, data };
	} catch (error) {
		console.log('like post error: ', error);
		return { success: false, msg: (error as Error).message };
	}
};

export const removePostLike = async (postId: string, userId: string) => {
	try {
		const { error } = await supabase
			.from('postLikes')
			.delete()
			.eq('postId', postId)
			.eq('userId', userId);
		if (error) {
			console.log('remove like post error: ', error);
			return { success: false, msg: (error as Error).message };
		}
		return { success: true };
	} catch (error) {
		console.log('remove like post error: ', error);
		return { success: false, msg: (error as Error).message };
	}
};
