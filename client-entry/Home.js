import Home from '../components/pages/Home.svelte';

new Home({
	target: document.body,
	hydrate: true,
	props: HYDRATION_DATA
});