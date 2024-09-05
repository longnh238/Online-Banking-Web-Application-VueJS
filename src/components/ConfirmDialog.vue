<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <p>{{ message }}</p>
      <button @click="confirmDelete">Confirm</button>
      <button @click="closeModal">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    confirmDelete() {
      this.$emit('close');
      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center; /* Center the text content */
}

.modal-content p {
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
}

.modal-content button {
  padding: 8px 15px;
  margin-right: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-content button:hover {
  background-color: #1c6ea4;
}
</style>