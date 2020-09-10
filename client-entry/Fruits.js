import Fruits from '../components/pages/Fruits.svelte';

new Fruits({
	target: document.body,
	hydrate: true,
	props: HYDRATION_DATA
});