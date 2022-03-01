<template>
  <button
    type="button"
    aria-controls="primary navigation"
    class="hamburger__button"
    @click="$emit('toggle')"
    :class="{ active: buttonActive }"
    :aria-expanded="buttonActive"
  >
    <span
      aria-hidden="true"
      class="hamburger__line hamburger__line--one"
    ></span>
    <span
      aria-hidden="true"
      class="hamburger__line hamburger__line--two"
    ></span>
    <span
      aria-hidden="true"
      class="hamburger__line hamburger__line--three"
    ></span>
  </button>
</template>

<script>
export default {
  name: 'HamburgerButton',
  props: {
    buttonActive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggle'],
};
</script>

<style lang="scss" scoped>
.hamburger__button {
  position: relative;
  z-index: 100;
  width: 35px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  margin-right: 3rem;

  &:focus-within {
    outline: 1px dotted $color-light-gray;
  }
}

.hamburger__line {
  display: block;
  width: 100%;
  height: 2px;
  background: $color-white;
  transition: 250ms ease-in;
}

.active .hamburger__line--one {
  transform: translateY(10px) rotate(-45deg);
}

.active .hamburger__line--two {
  transform: translateX(-50px);
  opacity: 0;
}

.active .hamburger__line--three {
  transform: translateY(-8px) rotate(45deg);
}
</style>
