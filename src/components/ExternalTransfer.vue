<template>
  <PageHeader />
  <div class="container">
    <PageNavigationMenuVue />
    <div class="content">
      <div class="dashboard-section">
        <h2>Transactions</h2>
      </div>
      <form id="transferForm">
        <div class="form-transactions">
          <label for="fromAccount">From Account:</label>
          <select id="fromAccount" name="fromAccount" v-model="sourceAccountIndex">
            <option v-for="(account, index) in accounts" :key="index" :value="index">
              {{ `Account ${account.id} (${account.type.charAt(0)}${account.type.slice(1).toLowerCase()}) - Balance:
              ${account.balance} CAD` }}
            </option>
          </select>
          <div v-if="sourceAccountIndex !== ''" style="font-size: 14px;">
            <p>Available Daily Transfer: {{ accounts[sourceAccountIndex].todayLimit }} CAD</p>
          </div>
        </div>
        <div class="form-transactions">
          <label for="toAccount">To Account:</label>
          <input type="number" id="toAccount" name="amount" placeholder="Enter account number to transfer"
            v-model="transferRequest.destinationAccountId" style="width: calc(100% - 22px)" />
          <button @click="getDestinationAccountInformation">Get Account Information</button>
          <div v-if="JSON.stringify(destinationAccount) !== '{}' && destinationAccount !== null"
            style="font-size: 14px;">
            <p>Account information: </p>
            <p>&#8212; Account number: {{ destinationAccount.id }}</p>
            <p>&#8212; Name: {{ destinationAccount.customerName }}</p>
          </div>
          <div v-if="destinationAccount === null" style="font-size: 14px;">
            <p style="color: red">{{ checkDestinationAccountMessage }}</p>
          </div>
        </div>
        <div class="form-transactions">
          <label for="amount">Amount to Transfer:</label>
          <input type="number" id="amount" name="amount" min="0" step="0.01" placeholder="Enter amount"
            v-model="transferRequest.amount" style="width: calc(100% - 22px)" />
          <!-- Styled input box -->
        </div>
        <button type="submit" :disabled="!isAllDataEnter" @click="transferBetweenAccounts">Transfer</button>
        <!-- Styled submit button -->
        <div style="display: flex; justify-content: center;">
          <p style="color: red">{{ message }}</p>
        </div>
      </form>
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

import AlertDialog from './AlertDialog.vue';

export default ({
  components: {
    PageHeader, PageFooter, PageNavigationMenuVue,
    AlertDialog
  },
  data() {
    return {
      cid: 0,
      accounts: [],
      sourceAccountIndex: '',
      sourceAccountId: '',
      sourceAccount: {},
      destinationAccount: {},
      amount: '',
      transferRequest: { destinationAccountId: '', amount: '' },  // json
      message: '',
      isDisabledTransferButton: true,
      checkDestinationAccountMessage: ''
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
    getDestinationAccountInformation(event) {
      event.preventDefault();
      AccountService.getDestinationAccountById(this.transferRequest.destinationAccountId)
        .then(response => {
          console.log(response.data.customerId);
          if (response.data.customerId == this.cid) {
            this.destinationAccount = null;
            this.checkDestinationAccountMessage = 'Please use Internal Transfer to transfer between your accounts';
          } else {
            this.destinationAccount = response.data;
          }
        })
        .catch(e => {
          this.destinationAccount = null;
          this.checkDestinationAccountMessage = 'This account is not available';
          console.log(e);
        })
    },
    transferBetweenAccounts(event) {
      event.preventDefault();
      this.message = '';

      this.sourceAccountId = this.accounts[this.sourceAccountIndex].id;

      AccountService.transferBetweenAccounts(this.sourceAccountId, this.transferRequest)
        .then(() => {
          this.openAlertDialog();
          this.getAllAccountsByCustomerId(this.cid);
        })
        .catch(e => {
          this.message = e.response.data.message;
          console.log(e);
        })
    },
    openAlertDialog() {
      this.dialogMessage = 'Transferred successfully!';
      this.$refs.alertDialog.showNotification = true;
    }
  },
  computed: {
    isAllDataEnter() {
      return this.sourceAccountIndex !== ''
        && this.transferRequest !== null
        && this.transferRequest.destinationAccountId !== ''
        && this.transferRequest.amount !== '' && this.transferRequest.amount > 0;
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
  color: #fff;
  padding: 8px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.account-action:hover {
  background-color: #1c6ea4;
}

.form-transactions {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #2980b9;
}

select#fromAccount,
input#toAccount,
input#amount {
  width: 100%;
  /* Adjusted width to accommodate border and padding */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-right: 10px
}

button {
  background-color: #3498db;
  color: #fff;
  margin: 20px auto;
  text-align: center;
  padding: 10px 30px;
  margin-bottom: 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"] {
  background-color: #3498db;
  color: #fff;
  margin: 20px auto;
  text-align: center;
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
}

button[type="submit"]:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

input[type="submit"]:hover {
  background-color: #1c6ea4;
}
</style>