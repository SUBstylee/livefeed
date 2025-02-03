import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { theme } from '@/constants/theme';
import { hp, wp } from '@/helpers/common';
import Avatar from './Avatar';
import moment from 'moment';
import Icon from '@/assets/icons';
import RenderHtml from 'react-native-render-html';
import { getSupabaseImageSrc } from '@/services/imageService';
import { Image } from 'expo-image';
import { Video } from 'expo-av';
import { createPostLike, removePostLike } from '@/services/postService';
import alert from '@/helpers/alert';

interface PostCardProps {
	item: any;
	currentUser: any;
	router: any;
	hasShadow?: boolean;
}
const PostCard: React.FC<PostCardProps> = ({
	item,
	currentUser,
	hasShadow = true,
}) => {
	const textStyles = {
		color: theme.colors.dark,
		fontSize: hp(1.7),
	};
	const headerStyles = {
		color: theme.colors.dark,
	};
	const tagsStyles = {
		div: textStyles,
		p: textStyles,
		ol: textStyles,
		h1: headerStyles,
		h4: headerStyles,
	};
	const shadowStyle = {
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.06,
		shadowRadius: 6,
		elevation: 1,
	};
	const [likes, setLikes] = useState<any[]>([]);
	const [comments, setComments] = useState<any[]>([]);
	useEffect(() => {
		setLikes(item?.postLikes || []);
	}, []);
	const openPostOptions = () => {
		alert('Post options coming soon!');
	};
	const onLike = async () => {
		if (liked) {
			let updatedLikes = likes.filter(
				(like: any) => like?.userId !== currentUser?.id,
			);
			setLikes([...updatedLikes]);
			let res = await removePostLike(item?.id, currentUser?.id);
			console.log('removed like: ', res);
			if (!res.success) alert('Error!', res.msg);
		} else {
			let data = {
				postId: item?.id,
				userId: currentUser?.id,
			};
			setLikes([...likes, data]);
			let res = await createPostLike(data);
			console.log('res: ', res);
			if (!res.success) alert('Error!', res.msg);
		}
	};
	const onComment = () => {
		alert('Comments coming soon!');
		setComments([]);
	};
	const createdAtDate = moment(item.created_at).format('MMM D');
	const createdAtTime = moment(item.created_at).format('h:mm A');
	const createdAtFromNow = moment(item.created_at).fromNow();
	let liked = likes.filter((like: any) => like?.userId === currentUser?.id)[0]
		? true
		: false;
	let commented = false;
	return (
		<View style={[styles.container, hasShadow && shadowStyle]}>
			<View style={styles.header}>
				<View style={styles.userInfo}>
					<Avatar
						size={hp(4.5)}
						uri={item?.user?.image}
						rounded={theme.radius.md}
					/>
					<View style={{ gap: 2 }}>
						<Text style={styles.userName}>{item?.user?.name}</Text>
						<Text
							style={
								styles.postTime
							}>{`${createdAtFromNow} (${createdAtDate} at ${createdAtTime})`}</Text>
					</View>
				</View>
				<TouchableOpacity onPress={openPostOptions}>
					<Icon
						name='threeDotsHorizontal'
						strokeWidth={2}
						size={hp(2.4)}
						color={theme.colors.text}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.content}>
				<View style={styles.postBody}>
					{item?.body && (
						<RenderHtml
							contentWidth={wp(100)}
							source={{ html: item?.body }}
							tagsStyles={tagsStyles}
						/>
					)}
				</View>
				{item?.file && item?.file?.includes('postImages') && (
					<Image
						source={getSupabaseImageSrc(item?.file)}
						transition={100}
						style={styles.postMedia}
						contentFit='cover'
					/>
				)}
				{item?.file && item?.file?.includes('postVideos') && (
					<Video
						style={[styles.postMedia, { height: hp(30) }]}
						source={getSupabaseImageSrc(item?.file) || undefined}
						useNativeControls
						isLooping
					/>
				)}
			</View>
			<View style={styles.footer}>
				<View style={styles.footerButton}>
					<TouchableOpacity onPress={onLike}>
						<Icon
							name='thumbsUp'
							strokeWidth={2}
							size={hp(2.4)}
							color={liked ? theme.colors.primary : theme.colors.textLight}
						/>
					</TouchableOpacity>
					<Text style={styles.count}>{likes?.length}</Text>
				</View>
				<View style={styles.footerButton}>
					<TouchableOpacity onPress={onComment}>
						<Icon
							name='comment'
							strokeWidth={2}
							size={hp(2.4)}
							color={commented ? theme.colors.primary : theme.colors.textLight}
						/>
					</TouchableOpacity>
					<Text style={styles.count}>{comments?.length}</Text>
				</View>
			</View>
		</View>
	);
};

export default PostCard;

const styles = StyleSheet.create({
	container: {
		gap: 10,
		marginBottom: 15,
		borderRadius: theme.radius.xxl * 1.1,
		borderCurve: 'continuous',
		padding: 10,
		paddingVertical: 12,
		backgroundColor: theme.colors.white,
		borderWidth: 0.5,
		borderColor: theme.colors.gray,
		shadowColor: theme.colors.black,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	userName: {
		fontSize: hp(1.7),
		color: theme.colors.textDark,
		fontWeight: theme.fonts.medium as any,
	},
	postTime: {
		fontSize: hp(1.4),
		color: theme.colors.textLight,
		fontWeight: theme.fonts.medium as any,
	},
	content: {
		gap: 10,
	},
	postMedia: {
		height: hp(40),
		width: '100%',
		borderRadius: theme.radius.xl,
		borderCurve: 'continuous',
	},
	postBody: {
		marginLeft: 5,
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15,
	},
	footerButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		marginLeft: 5,
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 18,
	},
	count: {
		color: theme.colors.text,
		fontSize: hp(1.8),
	},
});
