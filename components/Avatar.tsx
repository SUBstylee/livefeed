import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { theme } from '@/constants/theme';
import { hp } from '@/helpers/common';
import { AvatarType } from '@/types/types';
import { getUserImageSrc } from '@/services/imageService';

const Avatar: React.FC<AvatarType> = ({
	uri,
	size = hp(4.5),
	rounded = theme.radius.md,
	style = {},
}) => {
	return (
		<Image
			source={getUserImageSrc(uri)}
			transition={100}
			style={[
				styles.avatar,
				{ width: size, height: size, borderRadius: rounded },
				style,
			]}
		/>
		// <Icon
		// 	name='user'
		// 	strokeWidth={2}
		// 	size={hp(3.2)}
		// 	color={theme.colors.text}
		// />
	);
};

export default Avatar;

const styles = StyleSheet.create({
	avatar: {
		borderCurve: 'continuous',
		borderColor: theme.colors.darkLight,
		borderWidth: 1,
	},
});
