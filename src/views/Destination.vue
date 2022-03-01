<template>
  <main class="main">
    <section class="section">
      <div class="container__destination">
        <h2 class="section__title">
          <span class="section__number" aria-hidden="true">01</span>pick your
          destination
        </h2>

        <div class="destination">
          <div class="image__container">
            <transition name="destination-fade" mode="out-in">
              <Image-container
                :imageSource="pageData[current]"
                :tech="false"
                :key="current"
                class="image"
              />
            </transition>
          </div>

          <div class="destination__container">
            <nav
              class="destination__navigation"
              aria-label="destination navigation"
              role="destination button list"
            >
              <ul class="list">
                <li
                  v-for="(destination, index) in pageData"
                  :key="index"
                  class="list__item"
                  @click="current = index"
                >
                  <button
                    type="button"
                    class="button--destination"
                    :class="{ 'button--active': current === index }"
                    role="button"
                    :aria-label="destination.name"
                    :aria-selected="current === index ? true : false"
                    :aria-controls="`${destination.name}-button`"
                  >
                    <span>{{ destination.name }} </span>
                  </button>
                </li>
                <div
                  class="destination__indicator"
                  ref="destinationIndicator"
                ></div>
              </ul>
            </nav>

            <Article class="destination__info">
              <template #header>
                <h3 class="destination__header">
                  {{ pageData[current].name }}
                </h3>
                <p class="destination__description">
                  {{ pageData[current].description }}
                </p>
              </template>
              <template #body>
                <section class="section section--details">
                  <div class="destination__details">
                    <h4>Avg. distance</h4>
                    <p>{{ pageData[current].distance }}</p>
                  </div>
                  <div class="destination__details">
                    <h4>Est. travel time</h4>
                    <p>{{ pageData[current].travel }}</p>
                  </div>
                </section>
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

import { ref, watch, onMounted, onUnmounted } from 'vue';

export default {
  name: 'Destination',
  components: {
    Article,
    ImageContainer,
  },
  setup() {
    const { current, pageData } = useData('destinations');
    const destinationIndicator = ref(null);
    let items = [];
    let index = ref(current);

    onMounted(() => {
      document.body.classList.add('body--destination');
      items = document.querySelectorAll('.list__item');

      toggleSecondaryIndicator();
    });

    watch(index, () => {
      toggleSecondaryIndicator();
    });

    const toggleSecondaryIndicator = () => {
      destinationIndicator.value.style.left = `${
        items[index.value].offsetLeft
      }px`;

      destinationIndicator.value.style.width = `${
        items[index.value].offsetWidth
      }px`;
    };

    onUnmounted(() => {
      document.body.classList.remove('body--destination');
    });

    return {
      current,
      pageData,
      destinationIndicator,
      index,
    };
  },
};
</script>

<style lang="scss" scoped>
// FADE CSS
.destination-fade-enter-active,
.destination-fade-leave-active {
  transition: all 400ms cubic-bezier(1, 0.5, 0.8, 1);
}

.destination-fade-enter-from,
.destination-fade-leave-to {
  opacity: 0;
}

// DESTINATION INDICATOR
.destination__indicator {
  position: absolute;
  z-index: 90;
  bottom: -7px;
  height: 2px;
  background: $color-white;
  transition: all 300ms linear;
  min-width: 40px;
}

.container__destination {
  width: 80%;
  max-width: 1500px;

  margin: 0 auto;
  padding-bottom: var(--mb-3);
}

.section__title {
  text-align: center;
  font-size: clamp(1.5rem, 1.5vw, 1.95rem);

  margin-bottom: var(--mb-3);
}

.destination__navigation {
  @include flex(row, baseline, center);

  height: 45px;
  margin-bottom: var(--mb-2);

  .list {
    position: relative;
    @include flex(row, baseline, null);
    gap: 1.85rem;
  }

  .list__item {
    display: inline-block;
  }

  .button--destination {
    position: relative;
    display: block;

    color: $color-light-blue;
    font-family: $Family-Barlow;
    font-size: clamp(0.95rem, 1vw, 1.125rem);
    font-weight: $Weight-400;

    letter-spacing: 2.7px;
    text-transform: uppercase;

    transition: color 250ms ease-in;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -7px;
      z-index: 5;

      width: 90%;
      height: 2px;

      background-color: transparent;
      transition: background-color 300ms ease-in-out;
    }

    &:focus-within::before,
    &:hover::before {
      background-color: rgba(210, 216, 249, 0.4);
    }

    &.button--active {
      color: $color-white;
    }
  }
}

.destination__header,
.destination__description {
  text-align: center;
}

.destination__header {
  color: $color-white;
  font-size: clamp(2.25rem, 3.5vw, 4.25rem);
  font-family: $Family-Bellefair;
  font-weight: $Weight-400;
  text-transform: uppercase;

  letter-spacing: 2.2px;
  line-height: 1;

  margin-bottom: var(--mb-1);
}

.destination__description {
  max-width: 35rem;

  color: $color-light-blue;
  font-family: $Family-Barlow;
  font-size: var(--normal-font-size);
  font-weight: $Weight-400;

  margin-bottom: var(--mb-1-5);

  margin-left: auto;
  margin-right: auto;
}

.section--details {
  @include flex(column, center, null);
  gap: 2rem;

  text-align: center;

  border-top: 1px solid hsla(0, 0%, 100%, 0.17);
  padding-top: var(--mb-1-5);
}

.destination__details {
  h4 {
    color: $color-light-blue;
    font-family: $Family-Barlow;
    font-size: clamp(0.85rem, 1vw, 1rem);
    font-weight: $Weight-400;
    letter-spacing: 2.36px;
    text-transform: uppercase;

    margin-bottom: var(--mb-0-5);
  }

  p {
    color: $color-white;
    font-family: $Family-Bellefair;
    font-size: clamp(1.45rem, 2vw, 1.95rem);
    font-weight: $Weight-400;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }
}

.image__container {
  @include flex(row, null, center);
  margin-bottom: var(--mb-3);
}

@include media-mobile-sm-up {
  .section--details {
    @include flex(row, null, space-evenly);
  }
}

@include media-tablet-lg {
  .container__destination {
    width: 90%;
    padding-bottom: 0;
  }

  .section__title {
    text-align: left;
  }

  .destination {
    @include flex(row, null, space-around);
    padding-top: 4rem;
  }

  .image__container,
  .destination__container {
    flex: 1;
  }

  .image__container {
    @include flex(row, center, center);
    margin-right: var(--mb-2);
  }

  .destination__navigation {
    @include flex(row, baseline, flex-start);
  }

  .destination__info {
    max-width: 35rem;
  }

  .destination__header,
  .destination__description {
    text-align: left;
  }

  .destination__description {
    margin-left: 0;
    margin-right: 0;
  }

  .section--details {
    @include flex(row, null, flex-start);
    text-align: left;
    gap: 7rem;
  }
}
</style>
