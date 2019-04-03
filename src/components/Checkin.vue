<template>
  <div id="checkin">
    <form @submit.prevent="validate" class="needs-validation">
        <div class="form-group">
            <label for="checkin_name">Your name is</label>
            <input id="checkin_name" class="form-control form-control-lg" :class="{ 'is-invalid': error !== '' }" name="checkin[name]" type="text" value="" v-model="customerName" @keyup="validateContent">
            <div class="invalid-feedback">{{ error }}</div>
        </div>
        <button type="submit" class="btn btn-block btn-primary btn-lg">Check-in</button>
    </form>
  </div>
</template>

<script>
import { CustomerName } from "@/domain/model/customer/CustomerName";
import { CustomerNameTooLongException } from "@/domain/model/customer/CustomerNameTooLongException";
import { CustomerNameEmptyException } from "@/domain/model/customer/CustomerNameEmptyException";

export default {
  name: 'Checkin',
  props: {},
  data () {
    return {
      error: '',
      customerName: ''
    }
  },
  methods: {
    validate () {
        try {
            this.customerName = CustomerName.create(this.customerName).value;
            this.error = '';

            return true;
        } catch (e) {
            if (e instanceof CustomerNameTooLongException) {
                this.error = 'Name is too long';
            } else if (e instanceof CustomerNameEmptyException) {
                this.error = 'Name cannot be empty';
            } else {
                this.error = 'Incorrect name';
            }
        }

        return false;
    },
    validateContent () {
      if (!this.error) {
        return true;
      }
      this.error = '';
      return true;
    }
  }
}
</script>

<style lang="scss">

</style>
