<template>
  <header class="header">
    <h1 class="logo">
      <router-link to="/">
        <img :src="require(`@/assets/img/shared/logo.svg`)" alt="logo" />
      </router-link>
    </h1>

    <div class="line"></div>

    <Hamburger-Button
      v-show="mobile"
      @toggle="toggleHamburger"
      :buttonActive="mobileMenu"
      @keydown.esc.exact="toggleHamburger"
    />

    <Desktop-Menu v-if="!mobile" :navLinks="navLinks" />
    <transition name="mobile-fade">
      <Mobile-Menu
        v-if="mobileMenu"
        :navLinks="navLinks"
        @hide-menu="toggleHamburger"
      />
    </transition>
  </header>
</template>

<script>
import DesktopMenu from './DesktopMenu.vue';
import HamburgerButton from './HamburgerButton.vue';
import MobileMenu from './MobileMenu.vue';

import { ref, onMounted } from 'vue';

export default {
  name: 'Header',
  components: {
    DesktopMenu,
    HamburgerButton,
    MobileMenu,
  },
  setup() {
    const navLinks = ref([
      {
        route: 'home',
        title: 'HOME',
        label: 'Go to home page',
      },
      {
        route: 'destination',
        title: 'DESTINATION',
        label: 'Read more about your travel destination',
      },
      {
        route: 'crew',
        title: 'CREW',
        label: 'Read more about your crew',
      },
      {
        route: 'technology',
        title: 'TECHNOLOGY',
        label: 'Read more about technology used in space project',
      },
    ]);

    let mobile = ref(null);
    let mobileMenu = ref(null);
    let windowWidth = ref(null);

    onMounted(() => {
      checkScreen();
      window.addEventListener('resize', checkScreen);
    });

    const toggleHamburger = () => {
      mobileMenu.value = !mobileMenu.value;
    };

    const checkScreen = () => {
      windowWidth.value = window.innerWidth;

      if (windowWidth.value <= 768) {
        return (mobile.value = true);
      }

      mobile.value = false;
      mobileMenu.value = false;
    };

    return {
      navLinks,
      mobile,
      mobileMenu,
      windowWidth,
      toggleHamburger,
      checkScreen,
    };
  },
};
</script>

<style lang="scss">
/* MOBILE FADE IN / OUT */
.mobile-fade-enter-active,
.mobile-fade-leave-active {
  transition: 300ms ease-in-out;
}

.mobile-fade-enter-from,
.mobile-fade-leave-to {
  transform: translateX(100%);
}

.mobile-fade-enter-to {
  transform: translateX(0);
}

.header {
  height: 90px;
  @include flex(row, center, space-between);
  padding-left: 3rem;
}

.logo {
  align-self: center;
}

.line {
  position: relative;
  flex: 1;

  height: 1px;
  background-color: rgba(210, 216, 249, 0.3);
  margin-left: 5rem;
  margin-right: -2rem;
  align-self: center;
  @include hide-content;
}

.nav {
  height: 100%;
  position: relative;
  overflow: hidden;
}

@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  .nav::before {
    backdrop-filter: blur(1.5rem);
  }
}

.nav::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 50;
  filter: blur(1.5rem);
}

.menu {
  position: relative;
  z-index: 100;
}

.menu__link {
  position: relative;

  display: block;

  color: $color-white;
  font-family: $Family-Barlow-Condensed;
  font-size: var(--normal-font-size);
  font-weight: $Weight-400;
  letter-spacing: 2.7px;
  text-transform: uppercase;
}

.number__span {
  font-weight: $Weight-600;
  margin-inline-end: 0.225rem;
}

@include media-between-media-tablet-and-media-tablet-lg {
  .number__span {
    display: none;
  }
}

@include media-desktop {
  .header {
    margin-top: 2.55rem;
  }

  .line {
    @include show-content;
  }
}
</style>
