<template>
  <picture v-if="!tech">
    <source
      media="(min-width: 992px)"
      :srcset="require(`@/${imageSource.images.webp}`)"
      type="image/webp"
    />
    <img
      :src="require(`@/${imageSource.images.png}`)"
      :alt="imageSource.name"
    />
  </picture>
  <picture v-else>
    <source
      media="(min-width: 992px)"
      :srcset="require(`@/${imageSource.images.portrait}`)"
    />
    <img
      :src="require(`@/${imageSource.images.landscape}`)"
      :alt="imageSource.name"
    />
  </picture>
</template>

<script>
export default {
  name: 'ImageContainer',
  props: {
    imageSource: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    tech: {
      type: Boolean,
      default: false,
      required: true,
    },
    name: {
      type: String,
    },
  },
};
</script>
