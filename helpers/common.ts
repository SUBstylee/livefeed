import { Dimensions } from 'react-native';

let deviceWidth = 0;
let deviceHeight = 0;

if (typeof window !== 'undefined') {
	const { width, height } = Dimensions.get('window');
	deviceWidth = width;
	deviceHeight = height;
}

export const hp = (percentage: number) => {
	return (percentage * deviceHeight) / 100;
};

export const wp = (percentage: number) => {
	return (percentage * deviceWidth) / 100;
};
