import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // GitHub Pages(프로젝트 사이트)는 /저장소이름/ 아래에서 서비스되므로 배포 시 VITE_BASE 로 지정합니다.
  base: process.env.VITE_BASE || '/',
  plugins: [vue()],
  server: { port: 5173 },
});
