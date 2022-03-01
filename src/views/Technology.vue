<template>
  <main class="main">
    <section class="section">
      <div class="container--technology">
        <h2 class="section__title">
          <span class="section__number" aria-hidden="true">03</span> space
          launch 101
        </h2>

        <div class="technology">
          <div class="image__container">
            <transition name="technology-fade" mode="out-in">
              <Image-container
                :imageSource="pageData[current]"
                :tech="true"
                :key="current"
                class="image"
              />
            </transition>
          </div>

          <div class="technology__container">
            <nav
              class="technology__navigation"
              aria-label="technology navigation"
              role="technology button list"
            >
              <ul class="list">
                <li
                  v-for="(technology, index) in pageData"
                  :key="index"
                  class="list__item"
                  @click="current = index"
                >
                  <button
                    type="button"
                    class="button--rounded"
                    :class="{ 'button--active': current === index }"
                    role="button"
                    :aria-label="technology.name"
                    :aria-selected="current === index ? true : false"
                    :aria-controls="`${technology.name}-button`"
                  >
                    <span>{{ index + 1 }} </span>
                  </button>
                </li>
              </ul>
            </nav>

            <Article class="technology__details">
              <template #header>
                <h4 class="technology__role">the terminology...</h4>
                <h3 class="technology__header">{{ pageData[current].name }}</h3>
              </template>
              <template #body>
                <p class="technology__description">
                  {{ pageData[current].description }}
                </p>
              </template>
            </Article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Article from '@/components/Article.vue';
import ImageContainer from '@/components/ImageContainer.vue';
import useData from '@/composables/useData';
import { onMounted, onUnmounted } from 'vue';

export default {
  name: 'Technology',
  components: {
    Article,
    ImageContainer,
  },
  setup() {
    const { current, pageData } = useData('technology');

    onMounted(() => {
      document.body.classList.add('body--technology');
    });

    onUnmounted(() => {
      document.body.classList.remove('body--technology');
    });

    return {
      current,
      pageData,
    };
  },
};
</script>

<style lang="scss" scoped>
// FADE CSS
.technology-fade-enter-active,
.technology-fade-leave-active {
  transition: all 400ms cubic-bezier(1, 0.5, 0.8, 1);
}

.technology-fade-enter-from,
.technology-fade-leave-to {
  opacity: 0;
}

.section__title {
  text-align: center;
  font-size: clamp(1.5rem, 1.5vw, 1.95rem);

  margin-bottom: var(--mb-3);
}

.technology__role,
.technology__header,
.technology__description {
  text-align: center;
}

.technology__role {
  letter-spacing: 2.2px;
  text-transform: uppercase;
  margin-bottom: var(--mb-1-5);
}

.technology__role,
.technology__description {
  color: $color-light-blue;
  font-family: $Family-Barlow;
  font-size: var(--normal-font-size);
  font-weight: $Weight-400;
}

.technology__header {
  color: $color-white;
  font-size: clamp(2.25rem, 3.5vw, 4.25rem);
  font-family: $Family-Bellefair;
  font-weight: $Weight-400;
  text-transform: uppercase;

  line-height: 1;
  margin-bottom: var(--mb-1);
}

.list {
  @include flex(row, center, null);
  gap: 1rem;

  &__item {
    display: inline-block;
  }
}

.image__container {
  position: relative;
}

.button--rounded {
  @include flex(row, center, center);
  $size: clamp(3rem, 4.5vw, 5rem);
  width: $size;
  height: $size;

  border-radius: 50%;
  border: 1px solid $color-dark-gray;
  transition: 300ms ease-in-out;

  span {
    color: $color-white;
    font-size: 1.5rem;
    transition: 300ms ease-in-out;
  }

  &:hover,
  &:focus-within {
    border-color: $color-white;
  }
}

.button--rounded.button--active {
  background-color: $color-white;

  span {
    color: $color-black;
  }
}

.technology__container {
  margin: 0 auto;
  padding-inline: 2rem;
}

.list {
  @include flex(row, center, center);

  margin: 2rem 0;
}

.image__container {
  @include flex(row, null, center);
}

.technology__description {
  max-width: 35rem;
  margin: 0 auto;
}

@include media-tablet-lg {
  .container--technology {
    width: 88vw;

    margin-left: auto;
  }

  .section__title {
    text-align: left;
  }

  .technology {
    @include flex(row-reverse, center, space-between);
  }

  .technology__container,
  .image__container {
    flex: 1;
  }

  .technology__container {
    @include flex(row, null, null);
    padding-inline: 0;
  }

  .image__container {
    @include flex(row, null, flex-end);
  }

  .list {
    @include flex(column, null, null);
    row-gap: 2rem;
    margin-right: 3rem;
  }

  .technology__details {
    align-self: center;

    margin-right: 2rem;
  }

  .technology__role,
  .technology__header,
  .technology__description {
    text-align: left;
  }
}
</style>
