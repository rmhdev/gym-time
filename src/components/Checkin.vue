<template>
    <div id="checkin">
        <div v-if="isValid" class="gym-customer-added alert alert-info" role="alert">
            <h4 class="gym-title alert-heading">Success</h4>
            <p>Enjoy your Gym Time!</p>
        </div>
        <form v-else @submit.prevent="submit" class="needs-validation" autocomplete="off">
            <div class="form-group">
                <label for="checkin_name">Your name is</label>
                <input
                    id="checkin_name"
                    type="text"
                    value=""
                    class="form-control form-control-lg"
                    :class="inputClass"
                    name="checkin[name]"
                    v-model="customerName"
                    @keyup="preValidate"
                >
                <div class="feedback" :class="feedbackClass">{{ feedback }}</div>
            </div>
            <button type="submit" class="btn btn-block btn-primary btn-lg">Check-in</button>
        </form>
    </div>
</template>

<script>
    import {CustomerName} from "@/domain/model/customer/CustomerName";
    import {CustomerNameTooLongException} from "@/domain/model/customer/CustomerNameTooLongException";
    import {CustomerNameEmptyException} from "@/domain/model/customer/CustomerNameEmptyException";

    export default {
        name: 'Checkin',
        props: {},
        data() {
            return {
                feedback: '',
                status: '',
                customerName: ''
            }
        },
        computed: {
            isValid() {
                return 'valid' === this.status;
            },
            feedbackClass() {
                switch (this.status) {
                    case 'valid':
                        return 'invalid-feedback';
                    case 'invalid':
                        return 'invalid-feedback';
                    default:
                        return '';
                }
            },
            inputClass() {
                switch (this.status) {
                    case 'valid':
                        return 'is-valid';
                    case 'invalid':
                        return 'is-invalid';
                    default:
                        return '';
                }
            }
        },
        methods: {
            validate() {
                try {
                    this.customerName = CustomerName.create(this.customerName).value;
                    this.status = 'valid';
                    this.feedback = '';

                    return true;
                } catch (e) {
                    this.status = 'invalid';
                    if (e instanceof CustomerNameTooLongException) {
                        this.feedback = 'Name is too long';
                    } else if (e instanceof CustomerNameEmptyException) {
                        this.feedback = 'Name cannot be empty';
                    } else {
                        this.feedback = 'Incorrect name';
                    }
                }

                return false;
            },
            preValidate(event) {
                if (event && ('Enter' === event.key)) {
                    return this.submit();
                }
                if ('valid' === this.status) {
                    return true;
                }
                this.status = '';
                this.feedback = '';

                return true;
            },
            submit(event) {
                if (event) {
                    event.preventDefault();
                }
                if (this.validate()) {
                    this.status = 'valid';
                    this.$store.dispatch('createAndAddNewCustomer', { 'name': this.customerName });

                    return true;
                }
                return false;
            }
        }
    }
</script>

<style lang="scss">

</style>
