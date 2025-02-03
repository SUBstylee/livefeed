import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { AuthContextType } from '@/types/types';
import { hp, wp } from '@/helpers/common';
import { theme } from '@/constants/theme';
import Icon from '@/assets/icons';
import { newPostPath, notificationsPath, profilePath } from '@/constants/paths';
import Avatar from '@/components/Avatar';
import { supabase } from '@/lib/supabase';
import { fetchPosts } from '@/services/postService';
import PostCard from '@/components/PostCard';
import Loading from '@/components/Loading';
import { getUserData } from '@/services/userService';

let limit = 0;
const Home = () => {
	const { user } = useAuth() as AuthContextType;
	const router = useRouter();

	const [posts, setPosts] = useState<any[]>([]);
	const [hasMorePosts, setHasMorePosts] = useState(true);

	const handlePostEvent = async (payload: any) => {
		if (payload.eventType == 'INSERT' && payload.new.id) {
			{
				let newPost = { ...payload.new };
				let res = await getUserData(newPost.userId);
				newPost.user = res.success ? res.data : {};
				setPosts((prevPosts) => [newPost, ...prevPosts]);
			}
		}
	};

	useEffect(() => {
		let postChannel = supabase
			.channel('posts')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'posts',
				},
				handlePostEvent,
			)
			.subscribe();
		return () => {
			supabase.removeChannel(postChannel);
		};
	}, []);

	const getPosts = async () => {
		if (!hasMorePosts) return null;
		limit += 10;
		let res = await fetchPosts(limit);
		if (res.success) {
			if (posts.length >= (res.data ?? []).length) setHasMorePosts(false);
			setPosts(res.data || []);
		}
	};

	return (
		<ScreenWrapper backgroundColor={theme.colors.white}>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>liveFeed</Text>
					<View style={styles.icons}>
						<Pressable
							onPress={() => router.push({ pathname: notificationsPath })}>
							<Icon
								name='alert'
								strokeWidth={2}
								size={hp(3.2)}
								color={theme.colors.text}
							/>
						</Pressable>
						<Pressable onPress={() => router.push({ pathname: newPostPath })}>
							<Icon
								name='plus'
								strokeWidth={2}
								size={hp(3.2)}
								color={theme.colors.text}
							/>
						</Pressable>
						<Pressable onPress={() => router.push({ pathname: profilePath })}>
							<Avatar
								uri={user?.image}
								size={hp(4.3)}
								rounded={theme.radius.sm}
								style={{ borderWidth: 2 }}
							/>
						</Pressable>
					</View>
				</View>
				<FlatList
					data={posts}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.listStyle}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<PostCard item={item} currentUser={user} router={router} />
					)}
					onEndReached={() => getPosts()}
					onEndReachedThreshold={0}
					ListFooterComponent={
						<View style={{ marginVertical: !posts.length ? 200 : 30 }}>
							{hasMorePosts && posts.length > 9 ? (
								<Loading />
							) : (
								<Text style={styles.noPosts}>
									{posts.length
										? 'No more posts'
										: 'There are currently no posts. You can be the first!'}
								</Text>
							)}
						</View>
					}
				/>
			</View>
		</ScreenWrapper>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: wp(4),
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
		marginHorizontal: wp(4),
	},
	title: {
		color: theme.colors.text,
		fontSize: hp(3.2),
		fontWeight: theme.fonts.bold as any,
	},
	avatarImage: {
		height: hp(4.3),
		width: hp(4.3),
		borderRadius: theme.radius.sm,
		borderCurve: 'continuous',
		borderColor: theme.colors.gray,
		borderWidth: 3,
	},
	icons: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 18,
	},
	listStyle: {
		paddingTop: 20,
		paddingHorizontal: wp(4),
	},
	noPosts: {
		color: theme.colors.text,
		fontWeight: theme.fonts.bold as any,
		fontSize: hp(2),
		alignItems: 'center',
		textAlign: 'center',
	},
	pill: {
		position: 'absolute',
		right: -10,
		top: -4,
		height: hp(2.2),
		width: hp(2.2),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
		backgroundColor: theme.colors.secondary,
	},
	pillText: {
		color: theme.colors.white,
		fontSize: hp(1.2),
		fontWeight: theme.fonts.bold as any,
	},
});
