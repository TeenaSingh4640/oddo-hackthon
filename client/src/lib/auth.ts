import { signIn, signOut } from 'next-auth/react';

export const loginWithGoogle = () => {
    signIn('google');
};
export const logout = () => {
    signOut();
};