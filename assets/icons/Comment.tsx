import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const Comment = (props: SvgProps) => (
	<Svg
		viewBox='0 0 24 24'
		width={24}
		height={24}
		color='#000000'
		fill='none'
		{...props}>
		<Path
			d='M22 11.5667C22 16.8499 17.5222 21.1334 12 21.1334C11.3507 21.1343 10.7032 21.0742 10.0654 20.9545C9.60633 20.8682 9.37678 20.8251 9.21653 20.8496C9.05627 20.8741 8.82918 20.9948 8.37499 21.2364C7.09014 21.9197 5.59195 22.161 4.15111 21.893C4.69874 21.2194 5.07275 20.4112 5.23778 19.5448C5.33778 19.0148 5.09 18.5 4.71889 18.1231C3.03333 16.4115 2 14.1051 2 11.5667C2 6.28357 6.47778 2 12 2C17.5222 2 22 6.28357 22 11.5667Z'
			stroke='currentColor'
			strokeWidth={props.strokeWidth}
			strokeLinejoin='round'
		/>
		<Path
			d='M11.9955 12H12.0045M15.991 12H16M8 12H8.00897'
			stroke='currentColor'
			strokeWidth={
				typeof props.strokeWidth === 'number'
					? props.strokeWidth * 1.33
					: undefined
			}
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</Svg>
);

export default Comment;
