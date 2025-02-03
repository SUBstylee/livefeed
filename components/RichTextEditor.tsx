import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RichTextEditorType } from '@/types/types';
import {
	actions,
	RichEditor,
	RichToolbar,
} from 'react-native-pell-rich-editor';

import { theme } from '@/constants/theme';
const RichTextEditor: React.FC<RichTextEditorType> = ({
	editorRef,
	onChange,
}) => {
	return (
		<View style={{ minHeight: 285 }}>
			<RichToolbar
				actions={[
					actions.removeFormat,
					actions.setStrikethrough,
					actions.setBold,
					actions.setItalic,
					actions.setUnderline,
					actions.insertOrderedList,
					actions.blockquote,
					actions.alignLeft,
					actions.alignCenter,
					actions.alignRight,
					actions.code,
					actions.line,
					actions.heading1,
					actions.heading4,
				]}
				iconMap={{
					[actions.heading1]: (tintColor: string) => (
						<Text style={{ color: tintColor }}>H1</Text>
					),
					[actions.heading4]: (tintColor: string) => (
						<Text style={{ color: tintColor }}>H4</Text>
					),
				}}
				style={styles.richToolbar}
				flatContainerStyle={styles.flatContainerStyle}
				editor={editorRef}
				disabled={false}
				selectedIconTintColor={theme.colors.primaryDark}
			/>
			<RichEditor
				ref={editorRef}
				onChange={onChange}
				containerStyle={styles.rich}
				editorStyle={styles.contentStyle}
				placeholder={'Write you post here...'}
			/>
		</View>
	);
};

export default RichTextEditor;

const styles = StyleSheet.create({
	richToolbar: {
		borderTopRightRadius: theme.radius.xl,
		borderTopLeftRadius: theme.radius.xl,
		backgroundColor: theme.colors.gray,
	},
	rich: {
		minHeight: 240,
		flex: 1,
		borderWidth: 1.5,
		borderTopWidth: 0,
		borderBottomLeftRadius: theme.radius.xl,
		borderBottomRightRadius: theme.radius.xl,
		borderColor: theme.colors.gray,
		padding: 5,
	},
	// Typed as 'any' so that the typescript compiler doesn't complain about the placeholderColor prop
	contentStyle: {
		color: theme.colors.textDark,
		placeholderColor: theme.colors.gray,
	} as any,
	flatContainerStyle: {
		paddingHorizontal: 8,
		gap: 3,
	},
});
