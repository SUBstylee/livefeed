import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';
import { AuthContextType, UserHeaderType } from '@/types/types';
import { useAuth } from '@/contexts/AuthContext';
import { theme } from '@/constants/theme';
import Header from '@/components/Header';
import { hp, wp } from '@/helpers/common';
import Icon from '@/assets/icons';
import { supabase } from '@/lib/supabase';
import Avatar from '@/components/Avatar';
import { editProfilePath } from '@/constants/paths';
import alert from '@/helpers/alert';

const Profile = () => {
	const { user, setAuth } = useAuth() as AuthContextType;
	const router = useRouter();
	const onLogout = async () => {
		setAuth(null);
		const { error } = await supabase.auth.signOut();
		if (error) {
			alert('Error logging out', error.message);
		}
	};
	const handleLogout = async () => {
		alert('Logout', 'Are you sure you want to logout?', [
			{
				text: 'Cancel',
				onPress: () => {},
				style: 'cancel',
			},
			{
				text: 'Logout',
				onPress: async () => {
					onLogout();
				},
				style: 'destructive',
			},
		]);
	};
	return (
		<ScreenWrapper backgroundColor={theme.colors.white}>
			<View style={styles.container}>
				<UserHeader user={user} router={router} handleLogout={handleLogout} />
			</View>
		</ScreenWrapper>
	);
};

const UserHeader: React.FC<UserHeaderType> = ({
	user,
	router,
	handleLogout,
}) => {
	return (
		<View style={styles.container}>
			<Header title='Profile' mb={30} />
			<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
				<Icon
					name='logout'
					strokeWidth={2}
					size={hp(3)}
					color={theme.colors.secondary}
				/>
			</TouchableOpacity>
			<View style={styles.container}>
				<View style={{ gap: 15 }}>
					<View style={styles.avatarContainer}>
						<Avatar
							size={hp(12)}
							uri={user?.image}
							rounded={theme.radius.xxl * 1.4}
						/>
						<Pressable
							style={styles.editIcon}
							onPress={() => router.push({ pathname: editProfilePath })}>
							<Icon
								name='edit'
								strokeWidth={2}
								size={20}
								color={theme.colors.textLight}
							/>
						</Pressable>
					</View>
					<View style={{ alignItems: 'center', gap: 4 }}>
						<Text style={styles.userName}>
							{(user && user.name) || 'You have not set a name.'}
						</Text>
						<View style={styles.info}>
							<Icon name='location' size={18} color={theme.colors.text} />
							<Text style={styles.infoText}>
								{(user && user.address) || 'You have not set a location.'}
							</Text>
						</View>
					</View>
					<View style={{ gap: 10 }}>
						<View style={styles.info}>
							<Icon name='mail' size={20} color={theme.colors.text} />
							<Text style={styles.infoText}>
								{(user && user.email) || 'You have not set an email.'}
							</Text>
						</View>
						<View style={styles.info}>
							<Icon name='call' size={20} color={theme.colors.text} />
							<Text style={styles.infoText}>
								{(user && user.phoneNumber) ||
									'You have not set a phone number.'}
							</Text>
						</View>
						<View style={styles.infoBio}>
							<Icon name='user' size={20} color={theme.colors.text} />
							<Text style={styles.infoText}>
								{(user && user.bio) || 'You have not set a bio.'}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.white,
		paddingHorizontal: wp(4),
	},
	headerContainer: {
		marginHorizontal: wp(4),
		marginBottom: 20,
	},
	headerShape: {
		width: wp(100),
		height: hp(20),
	},
	avatarContainer: {
		height: hp(12),
		width: hp(12),
		alignSelf: 'center',
	},
	editIcon: {
		position: 'absolute',
		bottom: 0,
		right: -12,
		padding: 7,
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
	userName: {
		fontSize: hp(3),
		fontWeight: theme.fonts.medium as any,
		color: theme.colors.text,
	},
	info: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	infoBio: {
		flexDirection: 'row',
		gap: 10,
	},
	infoText: {
		fontSize: hp(1.6),
		fontWeight: theme.fonts.medium as any,
		color: theme.colors.textLight,
	},
	logoutButton: {
		position: 'absolute',
		right: 0,
		padding: 5,
		borderRadius: theme.radius.sm,
		backgroundColor: theme.colors.secondaryLight,
	},
	listStyle: {
		paddingHorizontal: wp(4),
		paddingBottom: 30,
	},
	noPosts: {
		fontSize: hp(2),
		textAlign: 'center',
		color: theme.colors.text,
	},
});
