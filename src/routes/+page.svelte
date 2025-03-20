<script lang="ts">
  import { getSlug, getTitle } from '$/lib/media'

  const { data } = $props()
</script>

<h1 class="text-2xl text-center my-4">Home</h1>

<h2 class="text-xl ms-4 text-primary">Watchlist</h2>

<div class="flex flex-wrap gap-4 p-4">
  {#each data.user?.watchlist || [] as item}
    <div class="card card-compact card-bordered rounded-none w-40 aspect-[2/3]">
      <article class="card-body">
        <h3 class="mt-auto">
          <a
            href={`//trakt.tv/${item.type}s/${getSlug(item)}`}
            target="_blank"
            rel="noopener"
          >
            {getTitle(item)}
          </a>
          {#if item.type === 'movie'}
            <p>{item.movie.images.poster[0]}</p>
          {:else if item.type === 'season'}
            <p>{item.season.images.poster[0]}</p>
          {:else}
            <p>{item.show.images.poster[0]}</p>
          {/if}
        </h3>
      </article>
    </div>
  {/each}
</div>
