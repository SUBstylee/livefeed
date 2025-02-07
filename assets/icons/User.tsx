import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

const User = (props: SvgProps) => (
	<Svg
		viewBox='0 0 24 24'
		width={24}
		height={24}
		color='#000000'
		fill='none'
		{...props}>
		<Circle
			cx='12'
			cy='12'
			r='10'
			stroke='currentColor'
			strokeWidth={props.strokeWidth}
		/>
		<Path
			d='M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z'
			stroke='currentColor'
			strokeWidth={props.strokeWidth}
			strokeLinecap='round'
		/>
	</Svg>
);

export default User;
