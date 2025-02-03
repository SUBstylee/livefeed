import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonProps } from '@/types/types';
import { theme } from '@/constants/theme';
import { hp } from '@/helpers/common';
import Loading from './Loading';

const Button: React.FC<ButtonProps> = ({
	buttonStyle,
	textStyle,
	title = '',
	onPress = () => {},
	loading = false,
	hasShadow = true,
}) => {
	const shadowStyles = {
		shadowColor: theme.colors.dark,
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 4,
	};
	if (loading) {
		return (
			<View
				style={[
					styles.button,
					buttonStyle,
					{ backgroundColor: theme.colors.white },
				]}>
				<Loading />
			</View>
		);
	}
	return (
		<Pressable
			onPress={onPress}
			style={[
				styles.button,
				buttonStyle,
				textStyle,
				hasShadow && shadowStyles,
			]}>
			<Text style={[styles.text, textStyle]}>{title}</Text>
		</Pressable>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		backgroundColor: theme.colors.primary,
		height: hp(6.6),
		borderCurve: 'continuous',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: theme.radius.xl,
	},
	text: {
		fontSize: hp(2.5),
		color: theme.colors.white,
		fontWeight: theme.fonts.bold as any,
	},
});
