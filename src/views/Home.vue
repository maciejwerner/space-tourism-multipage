<template>
  <main class="main">
    <section class="section">
      <div class="container--main">
        <div class="home__wrapper">
          <p class="home__subtitle">so, you want to travel to</p>
          <h1 class="home__title">space</h1>
          <p class="home__text">
            Let’s face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this
            world experience
          </p>
        </div>
        <router-link to="/destination" class="explore__link">
          EXPLORE
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';

export default {
  name: 'Home',
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
.container--main {
  width: 100%;
  height: 100%;

  @include flex(column, center, space-evenly);
  row-gap: 6rem;

  text-align: center;
  padding-bottom: 6rem;
}

.home__wrapper {
  margin: 0 auto;
  width: clamp(20rem, 50vw, 42rem);
}

.home__title {
  color: $color-white;
  font-size: clamp(4.75rem, 12vw, 9rem);
  font-family: $Family-Bellefair;
  font-weight: $Weight-400;
  text-transform: uppercase;

  line-height: 1;
  margin-bottom: var(--mb-1);
}

.home__subtitle,
.home__text {
  color: $color-light-gray;
  font-weight: $Weight-400;
}

.home__subtitle {
  font-family: $Family-Barlow-Condensed;
  font-size: clamp(1.55rem, 1.5vw, 1.95rem);
  letter-spacing: 4.75px;
  text-transform: uppercase;

  margin-bottom: var(--mb-2-5);
}

.home__text {
  font-family: $Family-Barlow;
  font-size: clamp(0.95rem, 1vw, 1.125rem);
}

.explore__link {
  position: relative;
  z-index: 50;

  @include flex(row, center, center);

  background: $color-white;
  width: clamp(12rem, 25vw, 18rem);
  height: clamp(12rem, 25vw, 18rem);
  border-radius: 50%;

  color: $color-black;
  font-family: $Family-Bellefair;
  font-size: clamp(1.45rem, 2.25vw, 2.45rem);
  font-weight: $Weight-400;
  letter-spacing: 2.2px;
  text-transform: uppercase;

  animation: blurAnimation 2s linear infinite;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0;
    border-radius: 50%;

    background-color: hsla(0, 0%, 100%, 0.1);

    transform: scale(0);
    transition: transform 300ms ease-in-out;
  }

  &:focus-visible::before,
  &:hover::before {
    transform: scale(1.6);
  }
}

@keyframes blurAnimation {
  0% {
    outline: 1px solid rgba(#ffffff, 0.2);
  }
  100% {
    outline: 88px solid rgba(#ffffff, 0);
  }
}

@include media-tablet-lg {
  .container--main {
    @include flex(row, center, space-evenly);
    row-gap: 0;
    padding-bottom: 0;
  }

  .home__wrapper {
    margin: 0;
    width: clamp(20rem, 38vw, 42rem);
    text-align: left;
  }

  .home__text {
    max-width: 450px;
  }
}
</style>
