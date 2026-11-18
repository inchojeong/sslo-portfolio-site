// GitHub Pages 배포: 사이트를 빌드해 gh-pages 브랜치로 올립니다.  사용: npm run deploy
import { execSync } from 'node:child_process';
import { copyFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'inherit', ...opts });
const out = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim();

const remote = out('git remote get-url origin');
const repo = remote.replace(/\.git$/, '').split('/').pop();
const dist = 'dist';

run('npm run build', { env: { ...process.env, VITE_BASE: `/${repo}/` } });

// 새로고침·직접 접속 시 SPA 라우터가 동작하도록 404.html 을 index.html 로 대체
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));
writeFileSync(join(dist, '.nojekyll'), '');

if (existsSync(join(dist, '.git'))) rmSync(join(dist, '.git'), { recursive: true, force: true });
const git = (c) => run(`git ${c}`, { cwd: dist });
git('init -q -b gh-pages');
git(`config user.name "${out('git config user.name')}"`);
git(`config user.email "${out('git config user.email')}"`);
git('add -A');
git('commit -q -m "Deploy to GitHub Pages"');
git(`push -f ${remote} gh-pages`);
rmSync(join(dist, '.git'), { recursive: true, force: true });

console.log(`\n배포 완료: https://${remote.split('/').slice(-2, -1)[0]}.github.io/${repo}/`);
