'use server'

import { signOut } from '@/auth'

export const logOut = async () => {
  try {
    await signOut()
    return { message: 'You have been logged out.', status: 200 }
  } catch (error) {
    return { message: 'An ocurred log out.', status: 500, error: error }
  }
}
