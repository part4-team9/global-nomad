import { cookies } from 'next/headers'

export function getLoginStatus() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  return !!accessToken
}
