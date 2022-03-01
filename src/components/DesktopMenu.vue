<template>
  <nav class="nav" aria-label="primary navigation">
    <ul class="menu" ref="navList" id="primary navigation">
      <li
        class="menu__item"
        v-for="(link, index) in navLinks"
        :key="link.route"
      >
        <router-link
          :to="{ name: link.route }"
          class="menu__link"
          :aria-label="link.label"
        >
          <span aria-hidden="true" class="number__span">0{{ index }}</span>
          {{ link.title }}
        </router-link>
      </li>
      <div class="indicator" ref="indicator"></div>
    </ul>
  </nav>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'DesktopMenu',
  props: {
    navLinks: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  setup() {
    const route = useRoute();
    const indicator = ref(null);
    let links = [];

    onMounted(() => {
      links = document.querySelectorAll('.menu__link');
    });

    watch(route, () => {
      moveIndicator();
    });

    const moveIndicator = () => {
      switch (route.name) {
        case 'home':
          indicator.value.style.left = `${links[0].offsetLeft}px`;
          indicator.value.style.width = `${links[0].offsetWidth}px`;
          break;
        case 'destination':
          indicator.value.style.left = `${links[1].offsetLeft}px`;
          indicator.value.style.width = `${links[1].offsetWidth}px`;
          break;
        case 'crew':
          indicator.value.style.left = `${links[2].offsetLeft}px`;
          indicator.value.style.width = `${links[2].offsetWidth}px`;
          break;
        case 'technology':
          indicator.value.style.left = `${links[3].offsetLeft}px`;
          indicator.value.style.width = `${links[3].offsetWidth}px`;
          break;
        default:
          break;
      }
    };

    return {
      indicator,
      moveIndicator,
    };
  },
};
</script>

<style lang="scss" scoped>
// INDICATOR
.indicator {
  position: absolute;
  z-index: 90;
  bottom: -32px;
  height: 3px;

  background: $color-white;
  transition: all 300ms linear;
}

@include media-tablet {
  .nav {
    @include flex(row, center, null);
    padding-inline: clamp(5.55rem, 6rem, 7rem);

    &:before {
      background: linear-gradient(to right, hsla(0, 0%, 100%, 0.17), #0c0e18);
    }
  }

  .menu {
    @include flex(row, center, null);
    gap: 2.55rem;
  }

  .menu__item {
    display: inline-block;
  }

  a {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -32px;
      z-index: 5;

      width: 90%;
      height: 3px;

      background-color: transparent;
      transition: background-color 300ms ease-in-out;
    }

    &:hover::before {
      background-color: rgba(210, 216, 249, 0.4);
    }

    &.router-link-active::before {
      background-color: $color-white;
      z-index: 5;
    }
  }
}
</style>
