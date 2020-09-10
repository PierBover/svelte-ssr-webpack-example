<script>
	import {onMount} from 'svelte';
	import Menu from '../Menu.svelte';
	export let dateString;

	onMount(() => {
		setInterval(() => {
			dateString = (new Date()).toString() + ' Client-side rendered!';
		}, 1000);
	});
</script>

<Menu/>

<h1>Home</h1>

<p>{dateString}</p>