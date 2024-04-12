import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'check-study-time',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
