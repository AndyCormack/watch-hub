<script>
  import '../app.css'
</script>

<header class="navbar bg-base-200 sticky top-0 bg-opacity-85 backdrop-blur">
  <div class="navbar-start">
    <a href="/" class="btn btn-ghost text-xl">WatchHub</a>
  </div>

  <div class="navbar-center"></div>

  <div class="navbar-end"></div>
</header>

<slot />

<footer class="footer place-items-end p-2 bg-base-200 text-xs">
  <div class="flex items-center footer-center">
    Powered by <a class="inline-flex" href="https://trakt.tv/" target="_blank">
      <img src="/trakt/logo-darkmode.svg" alt="Trakt" width="60" />
    </a>
  </div>
</footer>
