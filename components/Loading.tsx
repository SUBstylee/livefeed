import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { theme } from '@/constants/theme';
import { LoadingProps } from '@/types/types';

const Loading: React.FC<LoadingProps> = ({
	size = 'large',
	color = theme.colors.primary,
}) => {
	return (
		<View style={{ justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size={size} color={color} />
		</View>
	);
};

export default Loading;

const styles = StyleSheet.create({});
