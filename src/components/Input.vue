<template>
  <div class="container__input">
    <form @submit.prevent="searchPokemon">
      <input
          class="input__search"
          type="text"
          placeholder="Pesquise por um Pokémon"
          v-model="search"
      />
      <button v-bind:disabled="search.length === 0" type="submit">Procurar</button>
    </form>
  </div>
</template>

<script>
export default {
  emits: ['search'],
  name: "Input",

  data() {
    return {
      search: '',
    }
  },
  methods: {
    searchPokemon() {
      this.$emit('search', this.search)
    }
  }
}
</script>
