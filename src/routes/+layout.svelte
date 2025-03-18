<script lang="ts">
  import '../app.css'
  import type { LayoutData } from './$types'

  const login = `https://api.trakt.tv/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_TRAKT_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_TRAKT_REDIRECT_URI}`

  export let data: LayoutData
</script>

<header class="navbar bg-base-200 sticky top-0 bg-opacity-85 backdrop-blur">
  <div class="navbar-start">
    <a href="/" class="btn btn-ghost text-xl">WatchHub</a>
  </div>

  <div class="navbar-center"></div>

  <div class="navbar-end">
    {#if data.user?.profile?.name}
      <a href="/profile/{data.user.profile.ids.slug}" class="btn btn-ghost">
        {data.user.profile.name}
      </a>
      <form method="POST" action="/auth?/logout">
        <button class="btn btn-ghost" data-sveltekit-preload-data="tap">
          Logout
        </button>
      </form>
    {:else}
      <a href={login} class="btn btn-ghost">Login</a>
    {/if}
  </div>
</header>

<div class="">
  <slot />
</div>

<footer class="footer place-items-end p-2 bg-base-200 text-xs">
  <div class="flex items-center footer-center">
    Powered by <a class="inline-flex" href="https://trakt.tv/" target="_blank">
      <img src="/trakt/logo-darkmode.svg" alt="Trakt" width="60" />
    </a>
  </div>
</footer>
