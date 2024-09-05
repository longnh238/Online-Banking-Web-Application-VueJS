<template>
  <PageHeader />
  <div class="container">
    <PageNavigationMenuVue />
    <div class="content">
      <div class="dashboard-section">
        <h2>Transaction History</h2>
      </div>
      <div class="account-selection">
        <label for="accountSelect">Select Account:</label>
        <select id="accountSelect" v-model="selectedAccountId">
          <option v-for="account in accounts" :key="account.id" :value="account.id">{{ `Account ${account.id}
            (${account.type.charAt(0)}${account.type.slice(1).toLowerCase()})` }}</option>
          <!-- Add more options if needed -->
        </select>
        <button type="submit" @click="getTransactionByAccountId">Get Transaction History</button>
      </div>
      <!-- Transaction History Section -->
      <div class="transaction-history" v-if="hasData">
        <ul>
          <li class="transaction-item" v-for="transaction in transactions" :key="transaction.id">
            <div class="transaction-details">
              <p class="transaction-date"><strong>Date: </strong>{{ new Date(transaction.time).toLocaleString() }}</p>
              <p v-bind:class="getClassForTransactionAmount(transaction.amount)"><strong>Amount: </strong> {{
          transaction.amount }} CAD</p>
              <p class="transaction-description"><strong>Description: </strong>{{ transaction.description }}</p>
            </div>
          </li>
        </ul>
      </div>
      <p v-else>{{ message }}</p>
    </div>
  </div>
  <PageFooter />
</template>

<script>
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import PageNavigationMenuVue from './PageNavigationMenu';

import CustomerService from '@/services/CustomerService';
import LoginService from '@/services/LoginService';
import AccountService from '@/services/AccountService';

export default ({
  components: {
    PageHeader, PageFooter, PageNavigationMenuVue
  },
  data() {
    return {
      cid: 0,
      accounts: null,
      transactions: null,
      selectedAccountId: '',
      hasTransactionHistory: '',
      message: ''
    }
  },
  methods: {
    getAllAccountsByCustomerId() {
      CustomerService.getAllAccountsByCustomerId(this.cid)
        .then(response => {
          this.accounts = response.data;
          this.accounts.sort((a, b) => a.id - b.id);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getTransactionByAccountId() {
      AccountService.getTransactionByAccountId(this.selectedAccountId)
        .then(response => {
          this.transactions = response.data;
          this.transactions.sort((a, b) => b.id - a.id);
        })
        .catch(e => {
          this.transactions = null;
          this.message = 'No transaction history from this account.';
          console.log(e);
        });
    },
    getClassForTransactionAmount(amount) {
      return {
        'transaction-amount-positive': amount >= 0,
        'transaction-amount-negative': amount < 0
      };
    }
  },
  computed: {
    hasData() {
      return this.transactions !== null && this.transactions.length > 0;
    }
  },
  mounted() {
    this.cid = localStorage.getItem('cid');
    if (!LoginService.isLoggedIn(this.cid)) {
      this.$router.push({ name: 'login' });
    }
    this.getAllAccountsByCustomerId();
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}

.content {
  flex-grow: 1;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.dashboard-section {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.dashboard-section:hover {
  transform: translateY(-5px);
}

.dashboard-section h2 {
  margin-bottom: 10px;
  color: #333;
  text-align: center;
}

.dashboard-section p {
  color: #666;
}

.header {
  background: linear-gradient(to right, #2980b9, #34495e);
  color: #fff;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  max-width: 100%;
}

.account-selection {
  margin-bottom: 20px;
}

.account-selection label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #2980b9;
}

.account-selection select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.account-selection button {
  background-color: #3498db;
  color: #fff;
  padding: 8px 16px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.account-selection button:hover {
  background-color: #1c6ea4;
}

.transaction-history {
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.transaction-history h3 {
  color: #3498db;
  font-size: 20px;
  margin-bottom: 10px;
}

.transaction-history ul {
  list-style-type: none;
  padding: 0;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.transaction-details {
  flex-grow: 1;
}

.transaction-date {
  color: #333;
  margin: 10px 0;
}

.transaction-amount {
  color: #27ae60;
  margin: 10px 0;
}

.transaction-amount-positive {
  color: green;
  margin: 10px 0;
}

.transaction-amount-negative {
  color: red;
  margin: 10px 0;
}

.transaction-description {
  color: #666;
  margin: 10px 0;
}

.transaction-action button {
  background-color: #3498db;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.transaction-action button:hover {
  background-color: #1c6ea4;
}
</style>