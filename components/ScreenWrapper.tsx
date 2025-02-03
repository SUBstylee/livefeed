import { View, Text } from 'react-native';
import React from 'react';

import { ScreenWrapperProps } from '@/types/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
	children,
	backgroundColor,
}) => {
	const insets = useSafeAreaInsets();
	const paddingTop = insets.top > 0 ? insets.top + 5 : 30;

	return (
		<View style={{ flex: 1, paddingTop, backgroundColor }}>{children}</View>
	);
};

export default ScreenWrapper;
