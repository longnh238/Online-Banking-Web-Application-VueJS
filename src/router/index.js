import { createWebHistory, createRouter } from "vue-router";
import CustomerLogin from "@/components/CustomerLogin.vue";
import HomePage from "@/components/HomePage.vue";
import ExternalTransfer from "@/components/ExternalTransfer.vue";
import TransactionHistory from "@/components/TransactionHistory.vue";
import AccountRegistration from "@/components/AccountRegistration.vue";
import InternalTransfer from "@/components/InternalTransfer.vue";
import ExchangeRate from "@/components/ExchangeRate.vue";
import AccountSetting from "@/components/AccountSetting.vue";

const routes = [
  {
    path: "/",
    alias: "/login",
    name: "login",
    component: CustomerLogin,
  },
  {
    path: "/home",
    alias: "/accounts",
    name: "home",
    component: HomePage,
  },
  {
    path: "/account-setting/:accountId",
    name: "accountSetting",
    component: AccountSetting,
    props: true,
  },
  {
    path: "/external-transfer",
    name: "externalTransfer",
    component: ExternalTransfer,
  },
  {
    path: "/internal-transfer",
    name: "internalTransfer",
    component: InternalTransfer,
  },
  {
    path: "/history",
    name: "history",
    component: TransactionHistory,
  },
  {
    path: "/registration",
    name: "registration",
    component: AccountRegistration,
  },
  {
    path: "/exchange-rate",
    name: "exchangeRate",
    component: ExchangeRate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
