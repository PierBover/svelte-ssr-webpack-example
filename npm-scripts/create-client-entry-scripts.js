const fs = require('fs');
const path = require('path');

const pagesDir = path.resolve(__dirname, '../components/pages');
const entryScriptsDir = path.resolve(__dirname, '../client-entry-scripts');

if (!fs.existsSync(entryScriptsDir)) {
	fs.mkdirSync(entryScriptsDir);
}


// Create entry scripts
const pagesComponentsFiles = fs.readdirSync(pagesDir, 'utf-8');

for (const filename of pagesComponentsFiles) {
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

// Delete old unused scripts
const entryScripts = fs.readdirSync(entryScriptsDir, 'utf-8');

for (const filename of entryScripts) {
	if (filename.includes('.js')) {
		const componentName = filename.replace('.js', '') + '.svelte';

		if (pagesComponentsFiles.indexOf(componentName) === -1) {
			const scriptPath = path.join(entryScriptsDir, filename);
			fs.unlinkSync(scriptPath);
			console.log('Deleted: ', scriptPath);
		}
	}
}