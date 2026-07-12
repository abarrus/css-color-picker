<script>
    import { Styles, Input } from '@sveltestrap/sveltestrap';
    let vali = $state("yargl");
</script>
<Styles />

<Input bind:value={vali} />
<p>{vali}</p>
