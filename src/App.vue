<template>
  <div id="app" class="container">

    <div class="text-center">
      <Welcome msg="Welcome!"/>
      <Clock/>
    </div>

    <div v-if="hasCheckoutCustomer">
      <checkout
        class="gym-customer-confirm-checkout"
        :customer="getCheckoutCustomer"
      ></checkout>
    </div>

    <div v-else class="row justify-content-md-center">
      <div class="col-5">
        <checkin></checkin>
      </div>
      <div class="col-1"></div>
      <div class="col-6">
        <customers
            @checkout="onCustomerCheckout"
        ></customers>
      </div>
    </div>
  </div>
</template>

<script>
import Welcome from './components/Welcome.vue'
import Clock from "./components/Clock";
import Checkin from "./components/Checkin";
import Checkout from "./components/Checkout";
import Customers from "./components/Customers";
import {Customer} from "@/domain/model/customer/Customer";

export default {
  name: 'app',
  data() {
    return {
      customerCheckout: this.customer
    }
  },
  props: {
    customer: {
      type: Customer,
      default: null
    }
  },
  computed: {
    hasCheckoutCustomer() {
      return null !== this.customerCheckout;
    },
    getCheckoutCustomer() {
      return this.customerCheckout;
    }
  },
  methods: {
    onCustomerCheckout(event) {
      this.customerCheckout = this.$store.getters.getRepository.findById(event.id);
    }
  },
  components: {
    Checkout,
    Clock,
    Welcome,
    Checkin,
    Customers
  }
}
</script>

<style lang="scss">

</style>
