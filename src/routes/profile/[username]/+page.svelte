<script lang="ts">
  import { page } from '$app/state'
  import Icon from '@iconify/svelte'

  const { data } = $props()
</script>

<h2
  class="relative content-center text-center text-2xl px-8 py-4 min-h-40 border-b border-b-primary bg-gradient-to-t from-primary/10 via-transparent via-20% bg-cover bg-center"
  style="background-image: url({data.coverImage});"
>
  {#if data.coverImage}
    <div
      class="absolute z-0 top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent via-90%"
    ></div>
  {/if}

  <div class="isolate hero-content">
    <a href="/profile/{data.profile?.ids.slug}">
      {data.profile?.name || data.profile?.username}
    </a>
    <a
      href="//trakt.tv/users/{data.profile?.ids.slug}"
      target="_blank"
      rel="noopener"
    >
      <Icon icon="mdi:open-in-new" class="text-primary inline-flex" />
    </a>
  </div>
</h2>

{#if !data.profile?.private}
  <div
    class="flex justify-center p-1 bg-secondary/5 border-b border-b-secondary/20"
  >
    <a
      class="btn btn-sm btn-ghost no-underline hover:bg-secondary/50"
      href="{page.url.pathname}/history"
    >
      History
    </a>
  </div>
{/if}

<div class="flex flex-col gap-4 p-4 justify-center">
  {#if data.profile?.private}
    <div class="text-center">
      <p class="text-2xl text-primary">This profile is private</p>
      <p class="text-gray-500">You need to be friends to see this profile</p>
    </div>
  {:else}{/if}
</div>

<style>
  .hero-content {
    text-shadow: 0 0 20px black;
  }
</style>
