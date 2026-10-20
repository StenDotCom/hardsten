// GitHub Pages serves 404.html for any unknown path. Copying index.html there
// lets deep links such as /projects/bedguard load the app on refresh, after
// which React Router renders the correct page.
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
if (existsSync(join(dist, 'index.html'))) {
  copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));
  // Disable Jekyll processing on GitHub Pages.
  writeFileSync(join(dist, '.nojekyll'), '');
  console.log('postbuild: created dist/404.html and dist/.nojekyll');
}
