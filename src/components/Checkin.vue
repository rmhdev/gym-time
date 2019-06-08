<template>
    <div id="checkin">
        <checkin-success
            class="gym-checkin-success"
            v-if="isValid"
            @close="restartForm"
        ></checkin-success>

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
                    ref="customerName"
                >
                <div class="feedback" :class="feedbackClass">{{ feedback }}</div>
            </div>

            <div class="form-group">
                <label for="checkin_category">Category:</label>
                <select
                    id="checkin_category"
                    class="gym-checkin-category"
                    name="checkin[category]"
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

<!--                <div-->
<!--                    v-for="category in categories"-->
<!--                    :key="category.value"-->
<!--                    class="form-check form-check-inline gym-checkin-category"-->
<!--                >-->
<!--                    <input-->
<!--                        type="radio"-->
<!--                        class="form-check-input"-->
<!--                        :id="'checkin_category_' + category.value"-->
<!--                        name="checkin[category]"-->
<!--                        :value="category.value"-->
<!--                        :checked="customerCategory === category.value"-->
<!--                        required="required"-->
<!--                        @change="customerCategory = category.value"-->
<!--                    ><label-->
<!--                        class="form-check-label"-->
<!--                        :for="'checkin_category_' + category.value"-->
<!--                    >{{ category.name }}</label>-->
<!--                </div>-->
            </div>

            <button type="submit" class="btn btn-block btn-success btn-lg">Check-in</button>
        </form>
    </div>
</template>

<script>
    import {CustomerName} from "@/domain/model/customer/CustomerName";
    import {CustomerNameTooLongException} from "@/domain/model/customer/CustomerNameTooLongException";
    import {CustomerNameEmptyException} from "@/domain/model/customer/CustomerNameEmptyException";
    import CheckinSuccess from "@/components/CheckinSuccess.vue";

    export default {
        name: 'Checkin',
        components: {
            CheckinSuccess
        },
        props: {},
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
                    this.$store.dispatch('createAndAddNewCustomer', {
                        name: this.customerName,
                        category: this.customerCategory
                    });

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
        }
    }
</script>

<style lang="scss">

</style>
