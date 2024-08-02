import { useCookies } from "vue3-cookies"; //install cookies: https://www.npmjs.com/package/vue3-cookies
const { cookies } = useCookies();
export function authHeader (this: any) {
  const accessToken = cookies.get('request_token');
  if (accessToken !== '') {
    return { Authorization: 'Bearer ' + accessToken }
  }
}
  