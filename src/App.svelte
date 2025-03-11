<script>
  import { isLoading } from 'svelte-i18n';
  import { Button, Heading } from "svelte-5-ui-lib";
</script>

{#if $isLoading}
  <p>Loading...</p>
{:else}
  <div class="h-screen bg-thistle-500">
    <div class="flex h-full w-full">
      <main class="p-4">
        <Heading>Hi</Heading>
        <Button color="light">Test</Button>
      </main>
    </div>
  </div>
{/if}