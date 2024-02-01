<script lang="ts">
  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

{#if data.error}
  <p class="bg-error text-error-content">{data.error}</p>
{/if}
