<script lang="ts">
    import { Input } from '@sveltestrap/sveltestrap';
	import ColorPicker from 'svelte-awesome-color-picker';
    import ClosestColor from '$lib/ClosestColor.svelte';
    import cssColors from 'css-color-names'

    let hexColor = $state("#ff3e00");

    let colorName = {
        get value() {
            return Object.keys(cssColors).find(
                key => cssColors[key as keyof typeof cssColors] === hexColor.toLowerCase()
            ) || hexColor;
        },
        set value(newName) {
            const matchedHex = cssColors[newName.toLowerCase() as keyof typeof cssColors];
            if (matchedHex) {
                hexColor = matchedHex;
            } else {
                hexColor = newName;
            }
        }
    };
</script>

<div class="d-flex gap-2 mb-5">
    <Input bind:value={colorName.value} />
    <ColorPicker
        bind:hex={hexColor}
        isAlpha={false}
        label=""
        isTextInput={false}
        --cp-border-color="lightgray"
    />
</div>
<ClosestColor color={colorName.value}/>