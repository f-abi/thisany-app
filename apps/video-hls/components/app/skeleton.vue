<template>
  <div
    class="relative overflow-hidden bg-[--td-bg-color-secondarycontainer] after:(pos-absolute bottom-0 left-0 right-0 top-0 animate-[app-skeleton--gradient_1.5s_linear_2s_infinite] from-transparent via-[var(--skeleton-animation-gradient)] to-transparent bg-gradient-to-r content-[''])"
  >
    <slot />
  </div>
</template>

<style lang="css">
@keyframes app-skeleton--gradient {
  0% {
    transform: translateX(-100%) skewX(-15deg);
  }
  100% {
    transform: translateX(100%) skewX(-15deg);
  }
}
</style>
