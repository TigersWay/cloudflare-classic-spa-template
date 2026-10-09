<script>
  import { ModeWatcher } from 'mode-watcher';
  import ModeToggle from '$lib/components/ModeToggle.svelte';

  import { name, version } from '../package.json';

  const HELLO_ROUTE = '/worker/hello';

  let greeting = $state('');
  let error = $state(false);

  $effect(() => {
    fetch(HELLO_ROUTE)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((message) => (greeting = message))
      .catch(() => (error = true));
  });

  const currentYear = String(new Date().getFullYear());
  const repoUrl = 'https://github.com/TigersWay/cloudflare-classic-spa-template';
</script>

<svelte:head>
  <title>{name} v{version}</title>
</svelte:head>

<ModeWatcher disableHeadScriptInjection={true} />

<header class="sticky top-0 z-100 mb-4 border-b border-border">
  <div class="mx-auto flex max-w-(--container-wide) justify-end gap-4 p-2">
    <ModeToggle />
  </div>
</header>

<main class="flex-[1_0_auto]">
  <div class="mx-auto max-w-(--container-wide) p-2">
    {#if error}
      <h1>Unable to reach the worker</h1>
      <p class="text-muted-foreground">Expected a response at <code>{HELLO_ROUTE}</code>.</p>
    {:else}
      <h1>{greeting || 'Loading…'}</h1>
    {/if}
  </div>
</main>

<footer class="mt-4 shrink-0 border-t border-border">
  <div class="mx-auto flex max-w-(--container-wide) gap-4 p-2">
    <ul class="m-0 flex list-none gap-8 text-sm text-muted-foreground">
      <li>
        Copyright © {currentYear}
        <a href={repoUrl} class="text-primary-foreground hover:underline">{name}</a>
      </li>
      <li>
        <a href="{repoUrl}#changelog" class="text-primary-foreground hover:underline" target="_blank">v{version}</a>
      </li>
    </ul>
  </div>
</footer>
