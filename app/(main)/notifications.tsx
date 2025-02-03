import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BackButton from '@/components/BackButton';
import { useRouter } from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';
import { wp } from '@/helpers/common';
import { theme } from '@/constants/theme';

const Notifications = () => {
	const router = useRouter();
	return (
		<ScreenWrapper backgroundColor={theme.colors.white}>
			<View style={styles.container}>
				<Text>Notifications</Text>
				<Text>Coming Soon!</Text>
				<BackButton router={router} />
			</View>
		</ScreenWrapper>
	);
};

export default Notifications;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: wp(4),
	},
});
