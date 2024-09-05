<template>
  <PageHeader />
  <div class="container">
    <PageNavigationMenuVue />
    <div class="content">
      <div class="dashboard-section">
        <h2>Account Setting</h2>
      </div>
      <div class="settings-form">
        <div class="form-group">
          <label for="dailyLimit">Daily Limit:</label>
          <input type="number" id="dailyLimit" name="dailyLimit" min="0" placeholder="Enter daily limit"
            v-model="updateAccountRequest.dailyLimit" style="width: calc(100% - 22px)">
        </div>
        <div class="form-group">
          <label for="minThreshold">Min Balance Threshold:</label>
          <input type="number" id="minThreshold" name="minThreshold" min="0" placeholder="Enter minimum threshold"
            v-model="updateAccountRequest.minBalanceThreshold" style="width: calc(100% - 22px)">
        </div>
        <div class="form-group">
          <label for="notificationPreference">Notification Preference:</label>
          <select id="notificationPreference" name="notificationPreference" disabled>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="push">Push Notification</option>
          </select>
        </div>
        <div class="form-group">
          <button type="submit" :disabled="!isAllDataEnter" @click="updateAccount">Save Settings</button>
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

import LoginService from '@/services/LoginService';
import AccountService from '@/services/AccountService';

import AlertDialog from './AlertDialog.vue';

export default ({
  components: {
    PageHeader, PageFooter, PageNavigationMenuVue,
    AlertDialog
  },
  data() {
    return {
      cid: 0,
      accountId: '',
      updateAccountRequest: { dailyLimit: '', minBalanceThreshold: '' },
      dialogMessage: ''
    }
  },
  methods: {
    getAccountInformation() {
      AccountService.getAccountById(this.accountId)
        .then(response => {
          this.updateAccountRequest = response.data;
        })
        .catch(e => {
          console.log(e);
        })
    },
    updateAccount() {
      AccountService.updateAccount(this.accountId, this.updateAccountRequest)
        .then(() => {
          this.openAlertDialog();
        })
        .catch(e => {
          console.log(e);
        })
    },
    openAlertDialog() {
      this.dialogMessage = 'Updated account settings successfully!';
      this.$refs.alertDialog.showNotification = true;
    }
  },
  computed: {
    isAllDataEnter() {
      return this.updateAccountRequest !== null
        && this.updateAccountRequest.dailyLimit !== '' && this.updateAccountRequest.dailyLimit > 0
        && this.updateAccountRequest.minBalanceThreshold !== '' && this.updateAccountRequest.minBalanceThreshold > 0;
    }
  },
  mounted() {
    this.cid = localStorage.getItem('cid');
    if (!LoginService.isLoggedIn(this.cid)) {
      this.$router.push({ name: 'login' });
    }

    this.accountId = this.$route.params.accountId;
    this.getAccountInformation();
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

button,
button[type="submit"] {
  background-color: #3498db;
  color: #fff;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  display: block;
  margin: 20px auto;
  text-align: center;
}

button[type="submit"]:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

button:hover,
button[type="submit"]:hover {
  background-color: #1c6ea4;
}
</style>