<script lang="ts">
  import Icon from '@iconify/svelte'
  import type { PageServerData } from './$types'

  const { data } = $props()
</script>

<h2
  class="text-2xl px-8 py-4 border-b border-b-primary bg-gradient-to-t from-primary/10 via-transparent via-20%"
>
  <a href="/profile/{data.profile?.ids.slug}">
    {data.profile?.name}
  </a>
  <a
    href="//trakt.tv/users/{data.profile?.ids.slug}"
    target="_blank"
    rel="noopener"
  >
    <Icon icon="mdi:open-in-new" class="text-primary inline-flex" />
  </a>
</h2>

<div class="flex flex-col gap-4 p-4 justify-center">
  {#if data.profile?.private}
    <div class="text-center">
      <p class="text-2xl text-primary">This profile is private</p>
      <p class="text-gray-500">You need to be friends to see this profile</p>
    </div>
  {:else}
    <div class="text-center">
      <p class="text-2xl text-primary">This profile is public</p>
      <p class="text-gray-500">You can see this profile</p>
    </div>
  {/if}
</div>
