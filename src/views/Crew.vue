<template>
  <main class="main">
    <section class="section">
      <div class="container">
        <h2 class="section__title">
          <span class="section__number" aria-hidden="true">02</span>meet your
          crew
        </h2>

        <div class="crew">
          <div class="image__container">
            <transition name="crew-fade" mode="out-in">
              <Image-container
                :imageSource="pageData[current]"
                :tech="false"
                :key="current"
                class="image"
              />
            </transition>
          </div>

          <div class="crew__container">
            <nav
              class="crew__navigation"
              aria-label="crew navigation"
              role="crew button list"
            >
              <ul class="list">
                <li
                  v-for="(person, index) in pageData"
                  :key="index"
                  class="list__item"
                  @click="current = index"
                >
                  <button
                    type="button"
                    class="button--rounded"
                    :class="{ 'button--active': current === index }"
                    role="button"
                    :aria-label="person.name"
                    :aria-selected="current === index ? true : false"
                    :aria-controls="`${person.name}-button`"
                  ></button>
                </li>
              </ul>
            </nav>

            <Article class="crew__details">
              <template #header>
                <h4 class="crew__role">{{ pageData[current].role }}</h4>
                <h3 class="crew__header">{{ pageData[current].name }}</h3>
              </template>
              <template #body>
                <p class="crew__description">
                  {{ pageData[current].bio }}
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
  name: 'Crew',
  components: {
    Article,
    ImageContainer,
  },
  setup() {
    const { current, pageData } = useData('crew');

    onMounted(() => {
      document.body.classList.add('body--crew');
    });

    onUnmounted(() => {
      document.body.classList.remove('body--crew');
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
.crew-fade-enter-active,
.crew-fade-leave-active {
  transition: all 400ms cubic-bezier(1, 0.5, 0.8, 1);
}

.crew-fade-enter-from,
.crew-fade-leave-to {
  opacity: 0;
}

.container {
  height: 100%;
  padding-bottom: 3rem;
}

.section__title {
  text-align: center;
  font-size: clamp(1.5rem, 1.5vw, 1.95rem);

  margin-bottom: var(--mb-3);
}

.list {
  @include flex(row, center, center);
  gap: 1.1rem;

  &__item {
    display: inline-block;
  }
}

// CREW NAVIGATION
.crew__navigation {
  margin: var(--mb-1-5) 0 var(--mb-2);
}

// CREW DETAILS
.article {
  display: grid;
  gap: var(--mb-1);
}

.crew__role,
.crew__header {
  font-family: $Family-Bellefair;
  font-weight: $Weight-400;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.crew__header,
.crew__role,
.crew__description {
  text-align: center;
}

.crew__role {
  color: $color-white;
  font-size: clamp(1.35rem, 1.5vw, 1.95rem);
  opacity: 0.45;
}

.crew__header {
  color: $color-white;
  font-size: clamp(1.85rem, 3.5vw, 4.25rem);
}

.crew__description {
  max-width: 500px;
  margin: 0 auto;

  color: $color-light-blue;
  font-family: $Family-Barlow;
  font-size: clamp(1rem, 0.8vw, 1.225rem);
  font-weight: $Weight-400;
}

.image__container {
  @include flex(row, null, center);

  border-bottom: 1px solid hsla(0, 0%, 100%, 0.17);
  overflow: hidden;

  .image {
    max-width: 55vw;
  }
}

.button--rounded {
  $size: clamp(0.95rem, 1.2vw, 1.125rem);
  width: $size;
  height: $size;
  border-radius: 50%;

  background-color: hsl(234, 6%, 33%);
  transition: background-color 300ms ease-in-out;

  &:hover,
  &:focus-visible {
    background-color: hsl(218, 10%, 79%);
  }
}

.button--active {
  background-color: $color-white;
}

@include media-tablet {
  .crew,
  .crew__container {
    @include flex(column-reverse, null, null);
  }

  .image__container {
    border-bottom: none;
  }
}

@include media-tablet-lg {
  .container {
    margin: 0 auto;
    width: 80%;
    padding: 0;
  }

  .section__title {
    text-align: left;
  }

  .crew {
    @include flex(row-reverse, null, space-between);
    column-gap: 2rem;
  }

  .crew__container {
    @include flex(column-reverse, null, center);
  }

  .crew__navigation {
    align-self: flex-start;
  }

  .crew__header,
  .crew__role,
  .crew__description {
    text-align: left;
  }

  .crew__description {
    margin: 0;
  }
}
</style>
