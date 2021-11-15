<script lang="ts">
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <div class="navbar-item">
            <a href="/"><img src="/favicon.png" alt="Plugin Gleisbelegung Logo" /></a>
            Plugin Gleisbelegung
        </div>
    </div>
    <div class="navbar-menu">
        <div class="navbar-item">
            <a href="/installation">Installation</a>
        </div>
        <div class="navbar-item">
            <a href="/faq">FAQ</a>
        </div>
        <div class="navbar-item">
            <a href="/changelog">Changelog</a>
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <a href="https://github.com/gleisbelegung/gleisbelegung">Github</a>
            </div>
            <div class="navbar-item">
                <span>
                    <!-- {#if $currentTime}
						{$currentTime.toFormat('HH:mm:ss')}
					{/if} -->
                </span>
            </div>
        </div>
    </div>
</nav>

<style>
    .navbar {
        border-radius: 0;
    }

    img {
        margin-right: 10px;
    }
</style>
