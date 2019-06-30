<template>
    <form @submit.prevent="submit" class="needs-validation" autocomplete="off">
        <div class="gym-input-group">
            <label for="customer_name" class="sr-only">Name</label>
            <input
                id="customer_name"
                type="text"
                value=""
                class="form-control"
                :class="inputClass"
                name="customer[name]"
                v-model="customerName"
                @keyup="preValidate"
                ref="customerName"
            >
            <div class="input-group-append">
                <label for="customer_category" class="sr-only">Category</label>
                <select
                    id="customer_category"
                    class="gym-checkin-category form-control form-control-lg"
                    name="customer[category]"
                    required="required"
                >
                    <option
                        v-for="category in categories"
                        :key="category.value"
                        :selected="customerCategory === category.value"
                        :value="category.value"
                        @change="customerCategory = category.value"
                    >{{ category.name }}</option>
                </select>
            </div>
        </div>

        <div class="gym-feedback-container">
            <div class="gym-feedback" :class="feedbackClass">{{ feedback }}</div>
        </div>

        <button type="submit" class="btn btn-block btn-success btn-lg">Save</button>
    </form>
</template>

<script>
    import {CustomerName} from "@/domain/model/customer/CustomerName";
    import {CustomerNameTooLongException} from "@/domain/model/customer/CustomerNameTooLongException";
    import {CustomerNameEmptyException} from "@/domain/model/customer/CustomerNameEmptyException";
    import {Customer} from "@/domain/model/customer/Customer";

    export default {
        name: 'Checkin',
        components: {},
        props: {
            customer: {
                type: Customer,
                default: null
            }
        },
        data() {
            return {
                feedback: '',
                status: '',
                customerName: '',
                customerCategory: ''
            }
        },
        computed: {
            isValid() {
                return 'valid' === this.status;
            },
            feedbackClass() {
                switch (this.status) {
                    case 'valid':
                        return 'valid-feedback';
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
            },
            categories() {
                return this.$store.getters.getCategories;
            }
        },
        methods: {
            restartForm() {
                this.status = '';
                this.customerName = '';
            },
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
                    this.$emit('submit:customer', this.customerName, this.customerCategory);

                    return true;
                }
                return false;
            }
        },
        mounted() {
            if (this.categories) {
                const categories = this.categories;
                this.customerCategory = categories[0].value;
            }
            this.$refs.customerName.focus();
            if (this.customer) {
                this.customerName = this.customer.name.value;
                this.customerCategory = this.customer.category.value;
            }
        }
    }
</script>

<style lang="scss">

</style>
