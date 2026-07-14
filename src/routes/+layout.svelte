<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
    import {
        Styles, Card, Navbar, 
        NavbarBrand, Nav, NavItem, 
        NavLink, Button
    } from '@sveltestrap/sveltestrap';

	let { children } = $props();

    // toggle light/dark mode
    let darkMode = $state(true);
    function toggleDarkMode() {
        darkMode = !darkMode;
    }
</script>
<Styles />

<svelte:head>
    <title>CSS Color Picker - abarrus</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- color is for bg color, light/dark is for text generally -->
<Navbar color={darkMode ? "dark-subtle" : "light"} light={!darkMode} dark={darkMode} expand="md" class="fixed-top px-4">
    <div class="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-sm-2">
        <NavbarBrand class="mb-0">CSS Color Picker</NavbarBrand>
        <Nav navbar>
            <NavItem>
                <NavLink href="https://github.com/abarrus/css-color-picker" class="text-muted small">
                    by abarrus
                </NavLink>
            </NavItem>
        </Nav>
    </div>

    <Nav class="ms-auto align-items-center" navbar>
        <NavItem>
            <!-- sun and moon icons found on iconify -->
            <!-- they are by Pixel Icon -->
            <Button onclick={toggleDarkMode} class="d-inline-flex align-items-center justify-content-center">
                {#if darkMode}
                    <!-- sun icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="currentColor" d="M17 10v4h-1v1h-1v1h-1v1h-4v-1H9v-1H8v-1H7v-4h1V9h1V8h1V7h4v1h1v1h1v1z" />
                        <path fill="currentColor" d="M21 11v-1h1V9h1V7h-3V6h-2V4h-1V1h-2v1h-1v1h-1v1h-2V3h-1V2H9V1H7v3H6v2H4v1H1v2h1v1h1v1h1v2H3v1H2v1H1v2h3v1h2v2h1v3h2v-1h1v-1h1v-1h2v1h1v1h1v1h2v-3h1v-2h2v-1h3v-2h-1v-1h-1v-1h-1v-2zm-3 4h-1v1h-1v1h-1v1H9v-1H8v-1H7v-1H6V9h1V8h1V7h1V6h6v1h1v1h1v1h1z" />
                    </svg>
                {:else}
                    <!-- moon icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="currentColor" d="M22 17v2h-1v1h-1v1h-2v1h-2v1h-6v-1H8v-1H6v-1H5v-1H4v-2H3v-2H2V9h1V7h1V5h1V4h1V3h2V2h2V1h5v1h-2v1h-2v1h-1v2H9v2H8v4h1v2h1v2h1v1h2v1h2v1h4v-1h2v-1z" />
                    </svg>
                {/if}
            </Button>
        </NavItem>
    </Nav>
</Navbar>

<div class="d-flex justify-content-center align-items-center vh-100 {darkMode ? "bg-dark" : ""}" data-bs-theme={darkMode ? "dark" : "light"}>
	<Card class="p-3">
		{@render children()}
	</Card>
</div>