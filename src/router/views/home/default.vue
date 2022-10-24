<script>
import Layout from '../../layouts/main.vue'
import Card from '../../../components/Card.vue'
import {api} from "../../../service.js";
import Input from "../../../components/Input.vue";
import Modal from "../../../components/Modal.vue";

export default {
  components: {
    Modal,
    Input,
    Layout,
    Card,
  },
  data() {
    return {
      pageList: [],
      firstPage: '/pokemon?limit=9&offset=0',
      nextPage: null,
      pokemonList: [],
      searchedPokemon: false,
      modal: {
        open: false,
        pokemon: null
      },


    }
  },
  mounted() {
    // First load
    api.get(this.firstPage).then((response) => {
      this.pageList = response.data;
      this.nextPage = response.data.next;
    })
  },
  methods: {
    pageChange() {
      api.get(this.searchedPokemon ? this.firstPage : this.nextPage).then((response) => {
        this.pageList = response.data;
        this.nextPage = response.data.next;
      })
    },
    openPokemon(pokemon) {
      this.modal.open = true;
      this.modal.pokemon = pokemon;
    },
    searchPokemon(pokemon) {
      this.searchedPokemon = true;
      api.get(`/pokemon/${pokemon}`).then((response) => {
        this.pokemonList = [response.data]
      }, (error) => {
        this.pokemonList = []
      })
    }
  },
  watch: {
    pageList: async function () {
      const promises = [];
      this.pageList.results.forEach((pokemon) => {
        promises.push(api.get(pokemon.url));
      });
      const results = await Promise.all(promises);

      if (this.searchedPokemon) this.pokemonList = []
      this.searchedPokemon = false;

      this.pokemonList = [...this.pokemonList, ...results.map((result) => result.data)];

      // for (let i = 0; i < this.pageList.results.length; i++) {
      //   await api.get(this.pageList.results[i].url).then((response) => {
      //     this.pokemonList.push(response.data);
      //   })
      // }
    }
  }
}
</script>
<template>
  <Layout>
    <div class="home__container">
      <Input @search="searchPokemon"/>

      <div class="container__pokemons">
        <Card
            v-if="pokemonList.length >= 1"
            v-for="pokemon in pokemonList"
            :id="pokemon['id']"
            :image="pokemon['sprites']['other']['dream_world']['front_default']"
            :name="pokemon['name']"
            :type="pokemon['types'][0]['type']['name']"
            v-on:click="openPokemon(pokemon)"
        />

        <h1 v-else>Nenhum pokemon encontrado!</h1>
      </div>
      <button class="btn__more" @click.prevent="pageChange">Carregar mais</button>
    </div>

    <!--    <Modal v-if="modal.open" :pokemon="modal.pokemon"/>-->
    <Modal v-if="modal.pokemon" pokemon="" v-model="modal.open" @confirm="confirm" @cancel="cancel">
      <img class="pokemon__sprite" :src="modal.pokemon['sprites']['other']['dream_world']['front_default']" alt="">
      <div class="pokemon__profile">

        <div class="pokemon__profile__right">
          <div class="pokemon__name">
            <h1>{{ modal.pokemon['name'] }}</h1>
            <p>#{{ modal.pokemon['id'] }}</p>
          </div>

          <div class="pokemon__size">
            <div class="pokemon__size__item">
              <p>Altura</p>
              <h2>0.{{ modal.pokemon['height'] }}m</h2>
            </div>
            <div class="pokemon__size__item">
              <p>Peso</p>
              <h2>{{ modal.pokemon['weight'] }}kg</h2>
            </div>
          </div>

          <div class="pokemon__types">
            <h3>Classes</h3>
            <div class="pokemon__type" v-for="type in modal.pokemon['types']">
              <img :src="`/assets/img/${type['type']['name']}.svg`" alt="">
              <p>{{ type['type']['name'] }}</p>
            </div>
          </div>

          <div class="pokemon__stats">
            <div class="pokemon__stats__item">
              <h3>HP</h3>
              <progress max="100" :value="modal.pokemon.stats[0].base_stat"></progress>
            </div>
            <div class="pokemon__stats__item">
              <h3>Attack</h3>
              <progress max="100" :value="modal.pokemon.stats[1].base_stat"></progress>
            </div>
            <div class="pokemon__stats__item">
              <h3>Defense</h3>
              <progress max="100" :value="modal.pokemon.stats[2].base_stat"></progress>
            </div>
            <div class="pokemon__stats__item">
              <h3>Special Attack</h3>
              <progress max="100" :value="modal.pokemon.stats[3].base_stat"></progress>
            </div>
            <div class="pokemon__stats__item">
              <h3>Special Defense</h3>
              <progress max="100" :value="modal.pokemon.stats[4].base_stat"></progress>
            </div>
            <div class="pokemon__stats__item">
              <h3>Speed</h3>
              <progress max="100" :value="modal.pokemon.stats[5].base_stat"></progress>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </Layout>
</template>

<style>

</style>