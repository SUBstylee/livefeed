import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import { theme } from '@/constants/theme';
import { hp, wp } from '@/helpers/common';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { AuthContextType, UserType } from '@/types/types';
import { noUserData } from '@/enums/copy';
import Icon from '@/assets/icons';
import Input from '@/components/Input';
import Button from '@/components/Button';
import alert from '@/helpers/alert';
import { updateUserData } from '@/services/userService';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { getUserImageSrc, uploadFile } from '@/services/imageService';

const EditProfile = () => {
	const router = useRouter();

	const { user: currentUser, setUserData } = useAuth() as AuthContextType;

	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<UserType>({
		image: null,
		name: '',
		address: '',
		phoneNumber: '',
		bio: '',
		id: currentUser.id,
	});

	useEffect(() => {
		if (currentUser) {
			setUser({
				image: currentUser.image || null,
				name: currentUser.name || '',
				address: currentUser.address || '',
				phoneNumber: currentUser.phoneNumber || '',
				bio: currentUser.bio || '',
				id: currentUser.id,
			});
		}
	}, [currentUser]);

	const onPickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.7,
		});
		if (!result.canceled) {
			setUser({ ...user, image: result.assets[0] });
		}
	};
	const onSubmit = async () => {
		let userData = { ...user };
		let { name, address, phoneNumber, bio, image } = userData;
		if (!name || !address || !phoneNumber || !bio || !image)
			return alert('Error!', 'Please fill in all fields!');
		setLoading(true);
		if (typeof image === 'object') {
			let imageRes = await uploadFile('profiles', image?.uri, true);
			if (imageRes.success) userData.image = imageRes.data;
			else userData.image = null;
		}
		const res = await updateUserData(currentUser?.id, userData);
		setLoading(false);
		if (res.success) {
			setUserData({ ...currentUser, ...userData });
			router.back();
		}
	};

	let imageSrc =
		user.image && typeof user.image == 'object'
			? user.image
			: getUserImageSrc(user.image);
	return (
		<ScreenWrapper backgroundColor={theme.colors.white}>
			<View style={styles.container}>
				<ScrollView style={{ flex: 1 }}>
					<Header title='Edit Profile' mb={30} />
					<View style={styles.form}>
						<View style={styles.avatarContainer}>
							<Image style={styles.avatar} source={imageSrc} />
							<Pressable style={styles.cameraIcon} onPress={onPickImage}>
								<Icon
									name='camera'
									strokeWidth={2}
									size={20}
									color={theme.colors.textLight}
								/>
							</Pressable>
						</View>
						<Text style={styles.profileText}>
							Fill in your profile details.
						</Text>
						<Input
							icon={<Icon name='user' strokeWidth={2} size={20} />}
							// style={styles.input}
							placeholder={(user && user.name) || noUserData.name}
							value={user.name}
							onChangeText={(value: string) =>
								setUser({ ...user, name: value })
							}
						/>
						<Input
							icon={<Icon name='location' strokeWidth={2} size={20} />}
							// style={styles.input}
							placeholder={(user && user.address) || noUserData.address}
							value={user.address}
							onChangeText={(value: string) =>
								setUser({ ...user, address: value })
							}
						/>
						<Input
							icon={<Icon name='call' strokeWidth={2} size={20} />}
							// style={styles.input}
							placeholder={(user && user.phoneNumber) || noUserData.phoneNumber}
							value={user.phoneNumber}
							onChangeText={(value: string) =>
								setUser({ ...user, phoneNumber: value })
							}
						/>
						<Input
							icon={<Icon name='comment' strokeWidth={2} size={20} />}
							// style={styles.bio}
							multiline={true}
							containerStyles={styles.bio}
							placeholder={(user && user.bio) || noUserData.bio}
							value={user.bio}
							onChangeText={(value: string) => setUser({ ...user, bio: value })}
						/>
						<Button title='Save Changes' loading={loading} onPress={onSubmit} />
					</View>
				</ScrollView>
			</View>
		</ScreenWrapper>
	);
};

export default EditProfile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: wp(4),
	},
	avatarContainer: {
		height: hp(14),
		width: hp(14),
		alignSelf: 'center',
	},
	avatar: {
		width: '100%',
		height: '100%',
		borderRadius: theme.radius.xxl * 1.8,
		borderCurve: 'continuous',
		borderWidth: 1,
		borderColor: theme.colors.darkLight,
	},
	profileText: {
		textAlign: 'center',
		fontSize: hp(1.5),
		color: theme.colors.text,
		marginTop: 10,
	},
	cameraIcon: {
		position: 'absolute',
		bottom: 0,
		right: -10,
		padding: 8,
		borderRadius: 50,
		backgroundColor: theme.colors.white,
		shadowColor: theme.colors.textLight,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.4,
		shadowRadius: 5,
		elevation: 7,
	},
	form: {
		gap: 18,
		marginTop: 20,
	},
	input: {
		flexDirection: 'row',
		borderWidth: 0.4,
		borderColor: theme.colors.text,
		borderRadius: theme.radius.xxl,
		borderCurve: 'continuous',
		paddingVertical: 17,
		paddingHorizontal: 20,
		gap: 15,
	},
	bio: {
		flexDirection: 'row',
		height: hp(15),
		alignItems: 'flex-start',
		paddingVertical: 15,
	},
});
