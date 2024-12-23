export const SUCCESS = 1

export const FAIL = 0

export const THIRD_PARTY_LOGIN_TAG = 't'
/*
export function getCurrentDomain(): string {
  const url = window.location.href;

  return new URL(url).origin;
}

const currentDomain = getCurrentDomain()
*/

// export const webRedirect = `${currentDomain}/dashbord/strategies`

export const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const googleRedirectUri = `${baseUrl}/api/auth/google`

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

export const googleAuthUrl =
  `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=${googleRedirectUri}&scope=profile email&client_id=${googleClientId}`


const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
const githubRedirectUri = `${baseUrl}/api/github-oauth`
export const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${githubRedirectUri}`
export const githubAppName = process.env.NEXT_PUBLIC_GITHUB_APP_NAME

export enum BotStatus {
  /**
   * During startup, it will change to running if the startup is successful.
   */
  Booting = 'Booting',

  Running = 'Running',

  Stopped = 'Stopped',

  Offline = 'Offline',
}

export type IBotOperate = 'run' | 'stop' | 'restart'

export interface INotifyBotMsg {
  id: string;
  status: BotStatus;
}

export const TOKEN_FIELD = 'botToken';

export type IJsonValue =
  | string
  | number
  | boolean
  | null
  | IJsonValue[]
  | { [key: string]: IJsonValue };

  export const ONE_SECOND = 1000
  export const ONE_MINUTE = ONE_SECOND * 60
  export const ONE_HOUR = ONE_MINUTE * 60
  export const ONE_DAY = ONE_HOUR * 24
  export const ONE_YEAR = ONE_DAY * 365