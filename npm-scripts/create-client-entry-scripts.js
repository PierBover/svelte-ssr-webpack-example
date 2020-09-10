const fs = require('fs');
const path = require('path');

const pagesDir = path.resolve(__dirname, '../components/pages');
const entryScriptsDir = path.resolve(__dirname, '../client-entry-scripts');

if (!fs.existsSync(entryScriptsDir)) {
	fs.mkdirSync(entryScriptsDir);
}

const pagesFiles = fs.readdirSync(pagesDir, 'utf-8');

for (const filename of pagesFiles) {
	if (filename.includes('.svelte')) {
		const componentName = filename.replace('.svelte', '');

		const script = `
			import ${componentName} from '../components/pages/${componentName}.svelte';

			new ${componentName}({
				target: document.body,
				hydrate: true,
				props: HYDRATION_DATA
			});
		`;

		const scriptPath = path.join(entryScriptsDir, componentName + '.js');
		fs.writeFileSync(scriptPath, script, 'utf-8');
		console.log('Created: ', scriptPath);
	}
}