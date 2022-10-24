<script>
export default {
  props: {
    id: {
      type: String,
      default: "001",
      required: true,
    },
    name: {
      type: String,
      default: 'Bulbasaur',
      required: true,
    },
    image: {
      type: String,
      default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
      required: true,
    },
    type: {
      type: String,
      default: 'normal',
      required: true,
    },
  },
  name: 'CardComponent',
}
</script>

<template>
  <div class="card">
    <div class="card__body">
      <div class="card__image" :class="type">
        <img :src="image" alt="">
      </div>
    </div>
    <div class="card__footer">
      <p class="card__key">#{{ id }}</p>
      <div class="card__title">
        <h3>{{ name }}</h3>
        <img :src="`/assets/img/${type}.svg`" alt="">
      </div>
    </div>
  </div>
</template>