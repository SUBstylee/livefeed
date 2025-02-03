import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { theme } from '@/constants/theme';
import Icon from '@/assets/icons';
import ScreenWrapper from '@/components/ScreenWrapper';
import BackButton from '@/components/BackButton';
import { useRouter } from 'expo-router';
import { hp, wp } from '@/helpers/common';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';
import alert from '@/helpers/alert';

const Login = () => {
	const router = useRouter();
	const emailRef = useRef('');
	const passwordRef = useRef('');
	const [loading, setLoading] = useState(false);

	const onSubmit = async () => {
		if (!emailRef.current || !passwordRef.current) {
			alert('Error', 'Please fill in all fields!');
			return;
		}
		let email = emailRef.current.trim();
		let password = passwordRef.current.trim();

		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			alert('Login', error.message);
			setLoading(false);
			return;
		}
		setLoading(false);
	};
	return (
		<ScreenWrapper backgroundColor={theme.colors.white}>
			<StatusBar barStyle='dark-content' />
			<View style={styles.container}>
				<BackButton router={router} />
				<View>
					<Text style={styles.welcomeText}>Hi There,</Text>
					<Text style={styles.welcomeText}>Welcome Back!</Text>
				</View>
				<View style={styles.form}>
					<Text style={{ fontSize: hp(1.5) }}>Please login to continue</Text>
					<Input
						icon={<Icon name='mail' size={26} strokeWidth={2} />}
						placeholder='Enter your email'
						onChangeText={(value: string) => (emailRef.current = value)}
					/>
					<Input
						icon={<Icon name='lock' size={26} strokeWidth={2} />}
						placeholder='Enter your password'
						secureTextEntry
						onChangeText={(value: string) => (passwordRef.current = value)}
					/>
					<Text style={styles.forgotPassword}>Forgot Password?</Text>
					<Button title='Login' onPress={onSubmit} loading={loading} />
					<View style={styles.footer}>
						<Text style={styles.footerText}>Don't have an account?</Text>
						<Pressable onPress={() => router.push({ pathname: '/signUp' })}>
							<Text
								style={[
									styles.footerText,
									{
										color: theme.colors.primary,
										fontWeight: theme.fonts.bold as any,
									},
								]}>
								Sign Up
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</ScreenWrapper>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 45,
		paddingHorizontal: wp(5),
	},
	welcomeText: {
		fontSize: hp(4),
		color: theme.colors.text,
		fontWeight: theme.fonts.bold as any,
	},
	form: {
		gap: 25,
	},
	forgotPassword: {
		textAlign: 'right',
		fontWeight: theme.fonts.semibold as any,
		color: theme.colors.text,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 5,
	},
	footerText: {
		textAlign: 'center',
		color: theme.colors.text,
		fontSize: hp(2.2),
	},
});
