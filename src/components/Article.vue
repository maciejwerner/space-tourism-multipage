<template>
  <article :class="$attrs.class">
    <slot name="header"></slot>
    <slot name="body"></slot>
  </article>
</template>

<script>
export default {
  name: 'Article',
};
</script>
