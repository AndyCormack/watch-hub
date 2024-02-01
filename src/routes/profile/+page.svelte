<script lang="ts">
  import Icon from '@iconify/svelte'
  import type { PageServerData } from './$types'
  export let data: PageServerData

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
</script>

<h2
  class="text-2xl px-8 py-4 border-b border-b-primary bg-gradient-to-t from-primary/10 via-transparent via-20%"
>
  Watch History
</h2>

<div class="flex flex-wrap gap-4 p-4 justify-center">
  {#each data.history || [] as item}
    <div
      class="card card-compact card-bordered border-slate-700 border-opacity-50 overflow-hidden bg-base-200 rounded-lg shadow-xl w-80"
    >
      <div
        class="card-title !mb-0 bg-base-300 border-b border-opacity-30 border-b-primary px-3 py-1"
      >
        <span
          class="overflow-hidden text-ellipsis whitespace-nowrap"
          title={item.movie?.title ||
            `${item.show?.title} - ${item.episode?.title}`}
        >
          {item.movie?.title || `${item.show?.title} - ${item.episode?.title}`}
        </span>
      </div>

      <div
        class="flex gap-2 items-center px-2 py-1 text-sm bg-base-300 bg-opacity-50"
      >
        <Icon icon="fluent:eye-20-regular" class="text-lg text-primary" />
        <span class="opacity-70">{formatDate(item.watched_at)}</span>
      </div>

      <div class="card-body">
        {#if item.episode}
          S{String(item.episode.season).padStart(2, '0')}
          - E{String(item.episode.number).padStart(2, '0')}
        {/if}
      </div>
    </div>
  {/each}
</div>
