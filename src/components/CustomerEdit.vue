<template>
    <div>
        <form>
            <div class="gym-input-group">
                <label :for="fieldId('name')" class="sr-only">Name</label>
                <input
                    :id="fieldId('name')"
                    type="text"
                    v-model="customerName"
                    class="form-control"
                    name="customer[name]"
                    ref="customerName"
                >

                <label :for="fieldId('category')" class="sr-only">Category</label>
                <select
                        :id="fieldId('category')"
                        class="gym-checkin-category form-control"
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
        </form>
    </div>
</template>


<script>
    import {Customer} from "@/domain/model/customer/Customer";

    export default {
        name: 'CustomerEdit',
        props: {
            customer: Customer,
        },
        data() {
            return {
                customerName: this.customer.name.value,
                customerCategory: this.customer.category.value,
            }
        },
        computed: {
            categories() {
                return this.$store.getters.getCategories;
            }
        },
        methods: {
            fieldId(name) {
                return 'customer_' + name + '_' + this.customer.id.value;
            }
        }
    }
</script>


<style>
</style>
