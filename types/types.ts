import { RichEditor } from 'react-native-pell-rich-editor';

export interface ScreenWrapperProps {
	children: React.ReactNode;
	backgroundColor?: string;
}

export interface ButtonProps {
	buttonStyle?: any;
	textStyle?: any;
	title?: string | undefined;
	onPress?: (() => void) | undefined;
	loading?: boolean | undefined;
	hasShadow?: boolean | undefined;
}

export interface BackButtonProps {
	size?: number | undefined;
	router?: any;
}

export interface LoadingProps {
	size?: 'small' | 'large' | undefined;
	color?: string | undefined;
}

export interface IconProps {
	name: string;
	size?: number;
	strokeWidth?: number;
	color?: string;
}

export interface AuthContextType {
	user: any;
	setAuth: (authUser: any) => void;
	setUserData: (userData: any) => void;
}

export interface AvatarType {
	uri: any;
	size?: number;
	rounded?: number;
	style?: object;
}

export interface UserHeaderType {
	user: any;
	router: any;
	handleLogout: () => void;
}

export interface HeaderType {
	title?: string;
	showBackButton?: boolean;
	mb?: number;
}

export interface AlertPolyfillType {
	(
		title: string,
		description?: string,
		options?: { text: string; onPress: () => void; style?: string }[],
	): void;
}

export interface UserType {
	image: any;
	name: string;
	address: string;
	phoneNumber: string;
	bio: string;
	id: string;
}

export interface RichTextEditorType {
	editorRef: any;
	onChange: (body: string) => void;
}
