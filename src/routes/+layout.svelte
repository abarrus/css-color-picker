<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
    import { Card, Navbar, 
        NavbarBrand, 
        Nav, 
        NavItem, 
        NavLink } from '@sveltestrap/sveltestrap';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar color="light" light expand="md" class="fixed-top px-4">
    <NavbarBrand href="/">CSS Color Picker</NavbarBrand>
    
    <Nav class="ms-auto align-items-center" navbar>
        <NavItem>
            <NavLink href="https://github.com/abarrus">
                by abarrus
            </NavLink>
        </NavItem>
    </Nav>
</Navbar>

<div class="d-flex justify-content-center align-items-center vh-100">
	<Card class="p-3">
		{@render children()}
	</Card>
</div>
