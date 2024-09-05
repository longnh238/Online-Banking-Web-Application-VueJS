<template>
  <div class="sidebar">
    <div class="user-info">
      <img src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="User Avatar">
      <h3 v-if="customer">{{ `${customer.firstName} ${customer.lastName}` }}</h3>
    </div>
    <h2>Dashboard</h2>
    <ul>
      <li>
        <router-link to="/accounts">Accounts</router-link>
      </li>
      <li>
        <router-link to="/internal-transfer">Internal Transfer</router-link>
      </li>
      <li>
        <router-link to="/external-transfer">External Transfer</router-link>
      </li>
      <li>
        <router-link to="/history">Transaction History</router-link>
      </li>
      <li>
        <router-link to="/registration">Account Registration</router-link>
      </li>
      <li>
        <router-link to="/exchange-rate">Exchange Rate</router-link>
      </li>
      <br><br>
      <li>
        <router-link to="/login" @click="logout">Logout</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import CustomerService from '@/services/CustomerService';

export default ({
  name: 'PageNavigationMenu',
  data() {
    return {
      cid: null,
      customer: null
    }
  },
  methods: {
    loadCustomerInformation() {
      CustomerService.getCustomerById(this.cid)
        .then(response => {
          this.customer = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    logout() {
      localStorage.removeItem('cid');
    }
  },
  mounted() {
    this.cid = localStorage.getItem('cid');
    this.loadCustomerInformation();
  },
})
</script>

<style scoped>
.sidebar {
  flex-basis: 250px;
  background-color: #2980b9;
  color: #fff;
  padding: 20px;
  position: sticky;
  top: 20px;
  border-radius: 10px;
  margin-right: 20px;
  transition: background-color 0.3s;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: center;
  /* Align menu items to the center */
}

.sidebar li {
  margin-bottom: 10px;
}

.sidebar h2 {
  padding-top: 32px;
  text-align: center;
}

.sidebar a {
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s;
  padding: 10px 15px;
  border-radius: 5px;
  display: inline-block;
}

.sidebar a:hover {
  background-color: #1c6ea4;
}

.user-info {
  text-align: center;
  margin-bottom: 20px;
}

.user-info img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 3px solid #fff;
  /* Added border */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Added box shadow */
}

.user-info h3 {
  margin: 0;
  color: #fff;
  font-size: 18px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  /* Added text shadow */
}

.user-info:before {
  content: '';
  display: block;
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  /* Added separator line */
  margin-bottom: 20px;
}
</style>
