<script>
    import { Input } from '@sveltestrap/sveltestrap';
	import ColorPicker from 'svelte-awesome-color-picker';
    import { getContext } from 'svelte';

	// Retrieve the store using the same key string used in setContext
	const appState = getContext('app-state');

    let color = $state("#ff3e00");
</script>

<div class="d-flex gap-2">
    <Input bind:value={color} />
    <ColorPicker
        bind:hex={color}
        isAlpha={false}
        label=""
        isTextInput={false}
        --cp-border-color="lightgray"
    />
</div>