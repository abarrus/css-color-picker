<script>
    import { ListGroup, ListGroupItem } from '@sveltestrap/sveltestrap';
    import { getClosestColors } from '$lib/closestColor';
    let { color } = $props();
    
    const closestColors = $derived(getClosestColors(color, 5));
</script>

<h3>Closest CSS Colors:</h3>
<ListGroup>
    {#each closestColors as color}
        <ListGroupItem>
            <div class="d-flex align-items-center">
                {color}
                <div style="margin-left: auto; width: 1rem; height: 1rem; background-color: {color}"></div>
            </div>
        </ListGroupItem>
    {/each}
</ListGroup>