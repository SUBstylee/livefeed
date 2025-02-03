import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { homePath, welcomePath } from '@/constants/paths';
import { AuthContextType } from '@/types/types';
import { getUserData } from '@/services/userService';
import { LogBox } from 'react-native';
import { ignoreWarnings } from '@/constants/ignore';

LogBox.ignoreLogs([...ignoreWarnings]);
const _layout = () => {
	return (
		<AuthProvider>
			<MainLayout />
		</AuthProvider>
	);
};
const MainLayout = () => {
	const { setAuth, setUserData } = useAuth() as AuthContextType;
	const router = useRouter();
	useEffect(() => {
		supabase.auth.onAuthStateChange((_event, session) => {
			// console.log('session: ', session?.user?.id);
			if (session) {
				setAuth(session.user);
				updateUserData(session?.user);
				router.replace({ pathname: homePath });
			} else {
				setAuth(null);
				router.replace({ pathname: welcomePath });
			}
		});
	}, []);
	const updateUserData = async (user: any) => {
		let res = await getUserData(user.id);
		if (res.success) {
			setUserData(res.data);
		}
	};
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		/>
	);
};

export default _layout;
