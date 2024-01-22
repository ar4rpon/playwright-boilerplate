declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly GOOGLE_MAIL: string;
        readonly GOOGLE_PASS: string;
        readonly SALESFORCE_LOGIN_URL: string;
        readonly SALESFORCE_MAIL: string;
        readonly SALESFORCE_PASS: string;
      }
    }
  }
}