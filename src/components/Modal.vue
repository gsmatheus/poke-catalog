<template>
  <vue-final-modal
      v-slot="{ params, close }"
      v-bind="$attrs"
      classes="modal-container"
      content-class="modal-content"
      v-on="$listeners"
  >
    <span class="modal__title">
      <slot name="title"></slot>
    </span>
    <div class="modal__content">
      <slot v-bind:params="params"></slot>
    </div>
    <!--    <div class="modal__action">-->
    <!--      <v-button @click="$emit('confirm', close)">confirm</v-button>-->
    <!--      <v-button @click="$emit('cancel', close)">cancel</v-button>-->
    <!--    </div>-->
    <button class="modal__close" @click="close">
      X
    </button>
  </vue-final-modal>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  name: "Modal",
  inheritAttrs: false
}
</script>

<style scoped>


.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}

.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

<!--<style>-->
<!--.dark-mode div::v-deep .modal-content {-->
<!--  border-color: #2d3748;-->
<!--  background-color: #1a202c;-->
<!--}-->
<!--</style>-->
