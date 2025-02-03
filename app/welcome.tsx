import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
} from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import Button from '@/components/Button';
import { theme } from '@/constants/theme';
import { hp, wp } from '@/helpers/common';
import { useRouter } from 'expo-router';
import { loginPath, signUpPath } from '@/constants/paths';

const Welcome = () => {
	const router = useRouter();
	return (
		<ScreenWrapper backgroundColor={theme.colors.white}>
			<StatusBar barStyle='dark-content' />
			<View style={styles.container}>
				<Image
					style={styles.welcomeImage}
					resizeMode='contain'
					source={require('@/assets/images/welcome.png')}
				/>
				<View style={{ gap: 20 }}>
					<Text style={styles.title}>liveFeed</Text>
					<Text style={styles.tagLine}>
						Keep up to date with what is going on!
					</Text>
				</View>
				<View style={styles.footer}>
					<Button
						title='Get Started!'
						buttonStyle={{ marginHorizontal: wp(3) }}
						onPress={() => router.push({ pathname: signUpPath })}
					/>
					<View style={styles.bottomTextContainer}>
						<Text style={styles.loginText}>I already have an account!</Text>
						<Pressable onPress={() => router.push({ pathname: loginPath })}>
							<Text
								style={[
									styles.loginText,
									{
										color: theme.colors.primary,
										fontWeight: theme.fonts.bold as any,
									},
								]}>
								Login
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</ScreenWrapper>
	);
};

export default Welcome;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: theme.colors.white,
		paddingHorizontal: hp(4),
	},
	welcomeImage: {
		height: hp(30),
		width: wp(100),
		alignSelf: 'center',
	},
	title: {
		color: theme.colors.text,
		fontSize: hp(4),
		textAlign: 'center',
		fontWeight: theme.fonts.extraBold as any,
	},
	tagLine: {
		textAlign: 'center',
		paddingHorizontal: wp(10),
		fontSize: hp(1.7),
		color: theme.colors.text,
	},
	footer: {
		gap: 30,
		width: '100%',
	},
	bottomTextContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 5,
	},
	loginText: {
		textAlign: 'center',
		color: theme.colors.text,
		fontSize: hp(2.2),
	},
});
