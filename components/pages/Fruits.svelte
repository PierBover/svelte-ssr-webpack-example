<script>
	import {onMount} from 'svelte';
	import Menu from '../Menu.svelte';
	export let fruits;
</script>

<Menu/>

<h1>Fruits</h1>

<ul>
	{#each fruits as fruit}
		<li>{fruit}</li>
	{/each}
</ul>