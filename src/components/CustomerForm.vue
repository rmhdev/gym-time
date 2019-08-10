<template>
    <form @submit.prevent="submit" class="gym-customer-form" autocomplete="off">
        <div class="gym-form-row">
            <div class="gym-form-group gym-form-group-name">
                <label for="customer_name">Name</label>
                <input
                        id="customer_name"
                        type="text"
                        value=""
                        class="gym-customer-name"
                        :class="inputClass"
                        name="customer[name]"
                        v-model="customerName"
                        @keyup="preValidate"
                        ref="customerName"
                        data-field="name"
                >
            </div>
            <div class="gym-form-group gym-form-group-category">
                <label for="customer_category">Category</label>
                <select
                    id="customer_category"
                    class="gym-customer-category"
                    name="customer[category]"
                    required="required"
                    data-field="category"
                >
                    <option
                        v-for="category in categories"
                        :key="category.value"
                        :selected="customerCategory === category.value"
                        :value="category.value"
                        @change="customerCategory = category.value"
                        :data-value="category.value"
                    >{{ category.name }}</option>
                </select>
            </div>
            <div v-if="!isDefaultMode" class="gym-form-group gym-form-group-save">
                <button type="submit" class="gym-button-save">
                    <span class="gym-action">
                        <span class="gym-action-name">Save</span>
                    </span>
                </button>
            </div>
        </div>

        <div class="gym-feedback-container" :class="{ 'gym-feedback-container-active': this.status === 'invalid' }">
            <div class="gym-feedback" :class="feedbackClass">{{ feedback }}</div>
        </div>

        <button
            v-if="isDefaultMode"
            type="submit"
            class="gym-button-save"
            data-button="save"
        >Save</button>
    </form>
</template>

<script>
    import {CustomerName} from "@/domain/model/customer/CustomerName";
    import {CustomerNameTooLongException} from "@/domain/model/customer/CustomerNameTooLongException";
    import {CustomerNameEmptyException} from "@/domain/model/customer/CustomerNameEmptyException";
    import {Customer} from "@/domain/model/customer/Customer";

    export default {
        name: 'CustomerForm',
        components: {},
        props: {
            customer: {
                type: Customer,
                default: null
            },
            mode: {
                type: String,
                default: 'default'
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
            isDefaultMode() {
                return 'default' === this.mode;
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
                    this.$emit('submit:customer', { name: this.customerName, category: this.customerCategory });

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
                this.customerCategory = this.customer.category;
            }
        }
    }
</script>

<style lang="scss"></style>
