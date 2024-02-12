<template>
  <button @click="confirm">Confirm</button>
  <button @click="saveChanges">Save changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  data() {
    return { changesSaved: false }
  },
  components: {
    UserItem,
  },
  inject: ['users'],
  methods: {
    confirm() {
      console.log('lalal');
      this.$router.push('/teams')
    },
    saveChanges() {
      this.changesSaved = true;
    }
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (this.changesSaved) {
      next();
    } else {
     const userLeave = confirm('Are you sure?');
     next(userLeave);
    }
  },
  unmounted() {
    console.log()
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>