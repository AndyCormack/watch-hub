<script lang="ts">
  import { page } from '$app/state'
</script>

<div class="flex flex-col h-full justify-center items-center gap-4">
  <h1 class="text-8xl font-light">{page.status}</h1>
  <p class="text-xl text-primary">{page.error?.message}</p>
</div>
