require('../scss/index.scss');

const fs = require('fs');
const path = require('path');

const Home = require('../components/pages/Home.svelte').default;
const Fruits = require('../components/pages/Fruits.svelte').default;

const dev = process.env.DEV === 'true';


// STATIC
const pathStaticDir = path.resolve(__dirname, './static');
const files = fs.readdirSync(pathStaticDir);
const stylesFilename = files.filter((filename) => filename.includes('styles'));
const homeJsFilename = files.filter((filename) => filename.includes('Home'));
const fruitsJsFilename = files.filter((filename) => filename.includes('Fruits'));

// init
const fastify = require('fastify')({
	ignoreTrailingSlash: true,
	logger: true
});

fastify.register(require('fastify-compress'));

fastify.register(require('fastify-static'), {
	root: pathStaticDir
});

function renderPage (head, body, jsFilename, data) {
	return `
	<html>
		<head>
			${head}
			<link rel="stylesheet" href="/${stylesFilename}" />
			<script>
				const HYDRATION_DATA = ${JSON.stringify(data)}
			</script>
		</head>
		<body>
			<div id="page">${body}</div>
			<script src="${jsFilename}"></script>
		</body>
	</html>
	`
}

fastify.route({
	method: 'GET',
	url: '/',
	handler: (request, reply) => {
		reply.header('Content-Type', 'text/html');

		const data = {
			dateString: (new Date()).toString() + ' Server-side rendered!'
		};

		const {html, head} = Home.render(data);
		reply.send(renderPage(head, html, homeJsFilename, data));
	}
});

fastify.route({
	method: 'GET',
	url: '/fruits',
	handler: (request, reply) => {
		reply.header('Content-Type', 'text/html');

		const data = {
			fruits: ['Apple', 'Mango', 'Banana']
		};

		const {html, head} = Fruits.render(data);

		reply.send(renderPage(head, html, fruitsJsFilename, data));
	}
});

fastify.listen(process.env.PORT || '8888', '0.0.0.0', function (err, address) {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	fastify.log.info(`server listening on ${address}`)
});