import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const Search = (props: SvgProps) => (
	<Svg
		viewBox='0 0 24 24'
		width={24}
		height={24}
		color='#000000'
		fill='none'
		{...props}>
		<Path
			d='M14 14L16.5 16.5'
			stroke='currentColor'
			strokeWidth={props.strokeWidth}
			strokeLinejoin='round'
		/>
		<Path
			d='M16.4333 18.5252C15.8556 17.9475 15.8556 17.0109 16.4333 16.4333C17.0109 15.8556 17.9475 15.8556 18.5252 16.4333L21.5667 19.4748C22.1444 20.0525 22.1444 20.9891 21.5667 21.5667C20.9891 22.1444 20.0525 22.1444 19.4748 21.5667L16.4333 18.5252Z'
			stroke='currentColor'
			strokeWidth={props.strokeWidth}
			strokeLinecap='round'
		/>
		<Path
			d='M16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9Z'
			stroke='currentColor'
			strokeWidth={props.strokeWidth}
			strokeLinejoin='round'
		/>
	</Svg>
);

export default Search;
