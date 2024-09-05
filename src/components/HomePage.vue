<template>
  <PageHeader />
  <div class="container">
    <PageNavigationMenuVue />
    <div class="content">
      <div class="dashboard-section">
        <h2>Accounts</h2>
      </div>
      <div class="account" v-for="account in accounts" :key="account.id">
        <div class="account-details">
          <h3>{{ account.type.charAt(0) + account.type.slice(1).toLowerCase() }} Account</h3>
          <p>Balance: {{ account.balance }} CAD</p>
          <p>Account Number: {{ account.id }}</p>
        </div>
        <router-link :to="{ name: 'accountSetting', params: { accountId: account.id }}" class="account-action">Manage</router-link>
        <br><br>
        <a @click="openConfirmDialog(account.id)" class="account-action">Close</a>
      </div>
      <ConfirmDialog ref="confirmDialog" :message="dialogMessage" @close="deleteAccount()" />
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
import AccountService from '@/services/AccountService';

import ConfirmDialog from './ConfirmDialog.vue';
import AlertDialog from './AlertDialog.vue';

export default ({
  name: 'HomePage',
  components: {
    PageHeader, PageFooter, PageNavigationMenuVue,
    ConfirmDialog, AlertDialog
  },
  data() {
    return {
      cid: null,
      customer: {},
      accounts: [],
      dialogMessage: '',
      selectedAccountId: ''
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
    openConfirmDialog(id) {
      this.selectedAccountId = id;
      this.dialogMessage = 'Are you sure you want to close account ' + this.selectedAccountId + '?';
      this.$refs.confirmDialog.showModal = true;
    },
    openAlertDialog(id) {
      this.selectedAccountId = id;
      this.$refs.alertDialog.showNotification = true;
    },
    deleteAccount() {
      AccountService.deleteAccount(this.selectedAccountId, this.cid)
        .then(() => {
          this.dialogMessage = 'Account ' + this.selectedAccountId + ' has been closed successfully!';
          this.openAlertDialog(this.selectedAccountId);
          this.getAllAccountsByCustomerId();
        })
        .catch(e => {
          this.dialogMessage = e.response.data.error;
          this.openAlertDialog(this.selectedAccountId);
          console.log(e);
        });
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

.account {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.account:hover {
  transform: translateY(-5px);
}

.account h3 {
  color: #3498db;
  font-size: 20px;
  margin-bottom: 10px;
}

.account p {
  color: #666;
  font-size: 16px;
  margin: 5px 0;
}

.account-details {
  flex-grow: 1;
  margin-right: 20px;
}

.account-action {
  background-color: #3498db;
  width: 100px;
  text-align: center;
  color: #fff;
  padding: 8px 15px;
  margin: auto 10px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.account-action:hover {
  background-color: #1c6ea4;
  cursor: pointer;
}
</style>