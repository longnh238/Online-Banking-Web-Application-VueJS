<template>
  <PageHeader />
  <div class="container">
    <PageNavigationMenuVue />
    <div class="content">
      <div class="dashboard-section">
        <h2>Create Bank Account</h2>
      </div>
      <div class="bank-account-form">
        <form id="createAccountForm">
          <div class="form-group">
            <label for="accountType">Account Type:</label>
            <select id="accountType" name="accountType" v-model="accountRegistrationRequest.type">
              <option value="CHEQUING">Chequing Account</option>
              <option value="SAVINGS">Savings Account</option>
            </select>
          </div>
          <div class="form-group">
            <label for="initialDeposit">Initial Deposit:</label>
            <input type="number" id="initialDeposit" name="initialDeposit" min="0"
              v-model="accountRegistrationRequest.balance" placeholder="Enter initial deposit" required
              style="width: calc(100% - 22px)">
          </div>
          <div class="form-group">
            <label for="daily-limit">Daily Limit:</label>
            <input type="number" id="daily-limit" name="daily-limit" min="0" step="0.01" placeholder="Enter amount"
              v-model="accountRegistrationRequest.dailyLimit" style="width: calc(100% - 22px)" />
          </div>
          <div class="form-group">
            <label for="min-balance-threshold">Min Balance Threshold:</label>
            <input type="number" id="min-balance-threshold" name="min-balance-threshold" min="0" step="0.01"
              placeholder="Enter amount" v-model="accountRegistrationRequest.minBalanceThreshold"
              style="width: calc(100% - 22px)" />
          </div>
          <div class="form-group">
            <button type="submit" :disabled="!isAllDataEnter" @click="accountRegistration">Create Account</button>
          </div>
        </form>
        <div v-if="JSON.stringify(newAccount) !== '{}' && newAccount !== null" style="font-size: 14px;">
          <p>New account created: </p>
          <p>&#8212; Account number: {{ newAccount.id }}</p>
          <p>&#8212; Type: {{ newAccount.type.charAt(0) + newAccount.type.slice(1).toLowerCase() }} Account</p>
        </div>
      </div>
      <AlertDialog ref="alertDialog" :message="dialogMessage" />
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

import AlertDialog from './AlertDialog.vue';

export default ({
  components: {
    PageHeader, PageFooter, PageNavigationMenuVue,
    AlertDialog
  },
  data() {
    return {
      cid: 0,
      accountRegistrationRequest: { type: 'CHEQUING', balance: '', dailyLimit: '', minBalanceThreshold: '' },  // json
      newAccount: {}
    }
  },
  methods: {
    accountRegistration(event) {
      event.preventDefault();
      CustomerService.createNewAccount(this.cid, this.accountRegistrationRequest)
        .then(response => {
          this.newAccount = response.data;
          this.openAlertDialog();
        })
        .catch(e => {
          this.newAccount = null;
          console.log(e);
        })
    },
    openAlertDialog() {
      this.dialogMessage = 'New account has been created successfully!';
      this.$refs.alertDialog.showNotification = true;
    }
  },
  computed: {
    isAllDataEnter() {
      return this.accountRegistrationRequest !== null
        && this.accountRegistrationRequest.type !== ''
        && this.accountRegistrationRequest.balance !== '' && this.accountRegistrationRequest.balance >= 0
        && this.accountRegistrationRequest.dailyLimit !== '' && this.accountRegistrationRequest.dailyLimit > 0
        && this.accountRegistrationRequest.minBalanceThreshold !== '' && this.accountRegistrationRequest.minBalanceThreshold > 0;
    }
  },
  mounted() {
    this.cid = localStorage.getItem('cid');
    if (!LoginService.isLoggedIn(this.cid)) {
      this.$router.push({ name: 'login' });
    }
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

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #2980b9;
}

input[type="number"],
input[type="text"],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #3498db;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

button:hover {
  background-color: #1c6ea4;
}
</style>