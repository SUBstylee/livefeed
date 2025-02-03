import React from 'react';
import { IconProps } from '@/types/types';
import { theme } from '@/constants/theme';

import { icons } from '../../enums/icons';

const Icon: React.FC<IconProps> = ({
	name,
	color = theme.colors.primary,
	...props
}) => {
	const IconComponent = icons[name as keyof typeof icons];
	return (
		<IconComponent
			height={props.size || 24}
			width={props.size || 24}
			strokeWidth={props.strokeWidth || 2}
			color={color}
			{...props}
		/>
	);
};

export default Icon;
