import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	Pressable,
	TextInput,
	Platform,
} from 'react-native';
import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';
import { wp, hp } from '@/helpers/common';
import { theme } from '@/constants/theme';
import Header from '@/components/Header';
import Avatar from '@/components/Avatar';
import { useAuth } from '@/contexts/AuthContext';
import RichTextEditor from '@/components/RichTextEditor';
import { UserType } from '@/types/types';
import Icon from '@/assets/icons';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';
import { getSupabaseImageSrc } from '@/services/imageService';
import { Video } from 'expo-av';
import alert from '@/helpers/alert';
import { createOrUpdatePost } from '@/services/postService';
import { RichEditor } from 'react-native-pell-rich-editor';

const NewPost = () => {
	const { user } = useAuth() as { user: UserType };
	const router = useRouter();
	const bodyRef = useRef('');
	const editorRef = useRef<RichEditor>(null);
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
	const [webText, setWebText] = useState('');

	const onPickImage = async (isImage: boolean) => {
		let mediaConfig: ImagePicker.ImagePickerOptions = {
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.7,
		};
		if (!isImage) mediaConfig = { mediaTypes: ['videos'], allowsEditing: true };
		let result = await ImagePicker.launchImageLibraryAsync(mediaConfig);
		if (!result.canceled) {
			setFile(result.assets[0]);
		}
	};

	const isLocalFile = (file: any) => {
		if (!file) return null;
		if (typeof file == 'object') return true;
		return false;
	};

	const getFileType = (file: ImagePicker.ImagePickerAsset) => {
		if (!file) return null;
		if (isLocalFile(file)) return file.type;
		if (file.uri.includes('postImages')) return 'image';
		return 'video';
	};

	const getFileUri = (file: ImagePicker.ImagePickerAsset) => {
		if (!file) return null;
		if (isLocalFile(file)) return file.uri;
		return getSupabaseImageSrc(file.uri)?.uri;
	};

	const onSubmit = async () => {
		if (!bodyRef.current && !file && !webText)
			return alert('Error!', 'Please write something and/or upload a file!');

		let data = {
			body: Platform.OS === 'web' ? webText : bodyRef.current,
			file,
			userId: user.id,
		};

		setLoading(true);
		let res = await createOrUpdatePost(data);
		setLoading(false);

		if (res.success) {
			setFile(null);
			bodyRef.current = '';
			setWebText('');
			editorRef.current?.setContentHTML('');
			router.back();
		} else {
			if ('msg' in res) {
				alert('Error!', res.msg);
			} else {
				alert('Error!', 'An unknown error occurred');
			}
		}
	};

	return (
		<ScreenWrapper backgroundColor={theme.colors.white}>
			<View style={styles.container}>
				<Header title='New Post' />
				<ScrollView contentContainerStyle={{ gap: 20 }}>
					<View style={styles.header}>
						<Avatar
							style={styles.avatar}
							uri={user.image}
							size={hp(6.5)}
							rounded={theme.radius.xl}
						/>
						<View style={{ gap: 2 }}>
							<Text style={styles.username}>{user && user.name}</Text>
							<Text style={styles.publicText}>Public</Text>
						</View>
					</View>
					<View style={styles.textEditor}>
						{Platform.OS === 'web' ? (
							<TextInput
								style={styles.textInput}
								multiline
								placeholder='Write your post here...'
								value={webText}
								onChangeText={setWebText}
							/>
						) : (
							<RichTextEditor
								editorRef={editorRef}
								onChange={(body) => (bodyRef.current = body)}
							/>
						)}
					</View>
					{file && (
						<View style={styles.file}>
							{getFileType(file) == 'video' ? (
								<Video
									style={{ flex: 1 }}
									source={{ uri: getFileUri(file) || '' }}
									useNativeControls
									isLooping
								/>
							) : (
								<Image
									source={{ uri: getFileUri(file) || '' }}
									resizeMode='cover'
									style={{ flex: 1 }}
								/>
							)}
							<Pressable onPress={() => setFile(null)} style={styles.closeIcon}>
								<Icon
									name='delete'
									strokeWidth={2}
									color={theme.colors.white}
									size={20}
								/>
							</Pressable>
						</View>
					)}
					{Platform.OS === 'web' ? (
						<Text style={styles.addImageText}>
							Adding images and videos currently disabled for web...
						</Text>
					) : (
						<View style={styles.media}>
							<Text style={styles.addImageText}>Add to post:</Text>
							<View style={styles.mediaIcons}>
								<TouchableOpacity onPress={() => onPickImage(true)}>
									<Icon
										name='image'
										size={30}
										color={theme.colors.dark}
										strokeWidth={2}
									/>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => onPickImage(false)}>
									<Icon
										name='video'
										size={33}
										color={theme.colors.dark}
										strokeWidth={2}
									/>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</ScrollView>
				<Button
					buttonStyle={{ height: hp(6) }}
					title={'Post'}
					loading={loading}
					hasShadow={false}
					onPress={onSubmit}
				/>
			</View>
		</ScreenWrapper>
	);
};

export default NewPost;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: wp(4),
		marginBottom: 30,
		gap: 15,
	},
	textInput: {
		minHeight: 240,
		borderWidth: 1.5,
		borderRadius: theme.radius.xl,
		borderColor: theme.colors.gray,
		padding: 12,
		fontSize: 16,
		color: theme.colors.textDark,
		textAlignVertical: 'top',
	},
	title: {
		fontSize: hp(2.5),
		color: theme.colors.text,
		fontWeight: theme.fonts.semibold as any,
		textAlign: 'center',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	username: {
		fontSize: hp(2.2),
		fontWeight: theme.fonts.semibold as any,
		color: theme.colors.text,
	},
	avatar: {
		height: hp(4.3),
		width: hp(4.3),
		borderRadius: theme.radius.sm,
		borderCurve: 'continuous',
		borderColor: 'rgba(0,0,0,0.1)',
		borderWidth: 1,
	},
	publicText: {
		fontSize: hp(1.8),
		fontWeight: theme.fonts.medium as any,
		color: theme.colors.textLight,
	},
	textEditor: {},
	media: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 1.5,
		padding: 12,
		paddingHorizontal: 18,
		borderRadius: theme.radius.xl,
		borderCurve: 'continuous',
		borderColor: theme.colors.gray,
	},
	mediaIcons: {
		flexDirection: 'row',
		gap: 15,
		alignItems: 'center',
	},
	addImageText: {
		fontSize: hp(1.8),
		fontWeight: theme.fonts.semibold as any,
		color: theme.colors.text,
	},
	imageIcon: {
		borderRadius: theme.radius.md,
	},
	file: {
		height: hp(30),
		width: '100%',
		borderRadius: theme.radius.xl,
		overflow: 'hidden',
		borderCurve: 'continuous',
	},
	video: {},
	closeIcon: {
		position: 'absolute',
		top: 10,
		right: 10,
		backgroundColor: 'rgba(255,0,0,0.6)',
		padding: 7,
		borderRadius: 50,
		shadowColor: theme.colors.textLight,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.6,
		shadowRadius: 8,
	},
});
