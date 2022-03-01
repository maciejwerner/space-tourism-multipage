<template>
  <section class="section">
    <div class="container--error">
      <h1 class="error__title">Sorry, this page does not exist</h1>
      <router-link to="/" class="error__link">
        <span>Go to home page</span>
        <span
          ><img :src="require(`@/assets/img/shared/logo.svg`)" alt="logo"
        /></span>
      </router-link>
    </div>
  </section>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
export default {
  name: 'Error',
  setup() {
    onMounted(() => {
      document.body.classList.add('body--home');
    });

    onUnmounted(() => {
      document.body.classList.remove('body--home');
    });
  },
};
</script>

<style lang="scss" scoped>
.container--error {
  height: 100%;
  @include flex(column, center, center);
  gap: 1.5rem;
}

.error__title {
  color: $color-white;
  font-size: clamp(3.75rem, 2vw, 7rem);
  font-family: $Family-Bellefair;
  font-weight: $Weight-400;
  text-transform: uppercase;

  line-height: 1;
  margin-bottom: var(--mb-1);
}

.error__link {
  @include flex(row, center, null);
  gap: 1rem;

  color: $color-white;
  font-family: $Family-Barlow;
  font-size: clamp(1.55rem, 1vw, 3rem);
  font-weight: $Weight-400;

  transition: color 250ms ease-in-out;
  will-change: color;

  &:hover,
  &:focus-visible {
    color: $color-light-blue;
  }
}
</style>
