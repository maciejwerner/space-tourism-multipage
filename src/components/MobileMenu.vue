<template>
  <nav class="nav" aria-label="primary navigation">
    <ul class="menu" id="primary navigation">
      <li
        class="menu__item"
        v-for="(link, index) in navLinks"
        :key="link.route"
      >
        <router-link
          :to="{ name: link.route }"
          class="menu__link"
          @keydown.esc.exact="hide"
          :aria-label="link.label"
        >
          <span aria-hidden="true" class="number__span">0{{ index }}</span>
          {{ link.title }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'MobileMenu',
  props: {
    navLinks: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  methods: {
    hide() {
      this.$emit('hide-menu', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@include media-between-mobile-xs-and-media-tablet-md {
  .nav {
    position: fixed;
    z-index: 90;
    inset: 0 0 0 40%;

    padding-left: 3rem;
    padding-top: clamp(10rem, 15vh, 30rem);

    &:before {
      background: linear-gradient(to bottom, #0c0e18, hsla(0, 0%, 100%, 0.17));
    }
  }

  .menu {
    @include flex(column, flex-start, null);
    gap: 1.75rem;
  }

  .menu__item {
    display: block;
    animation: animationFade 1s ease-in;
  }

  a {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -4px;
      z-index: -1;

      width: 90%;
      height: 2px;

      background-color: transparent;
      transition: background-color 300ms ease-in-out;
    }

    &:hover::before {
      background-color: rgba(210, 216, 249, 0.4);
    }

    &.router-link-active::before {
      background-color: $color-white;
      z-index: 90;
    }
  }
}
</style>
