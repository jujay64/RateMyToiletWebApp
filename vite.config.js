import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const {GOOGLE_MAPS_API_KEY = '',
        BACK_END_API_DOMAIN = '',
        BACK_END_API_PORT  = '',
        BACK_END_API_NEARBY_GET_URI = '',
        BACK_END_API_WITHIN_BOX_GET_URI = ''
  } = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(GOOGLE_MAPS_API_KEY),
      'process.env.BACK_END_API_DOMAIN': JSON.stringify(BACK_END_API_DOMAIN),
      'process.env.BACK_END_API_PORT': JSON.stringify(BACK_END_API_PORT),
      'process.env.BACK_END_API_NEARBY_GET_URI': JSON.stringify(BACK_END_API_NEARBY_GET_URI),
      'process.env.BACK_END_API_WITHIN_BOX_GET_URI': JSON.stringify(BACK_END_API_WITHIN_BOX_GET_URI)
    }
  };
});
