import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import './registerServiceWorker'
import './styles/main.scss'
import ClockWorker from 'worker-loader!./clock-worker.js';

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');

if (['production', 'development'].includes(process.env.NODE_ENV || '')) {
    // worker
    (function (store) {
        let w = null;
        if (typeof (Worker) !== 'undefined') {
            if (w === null) {
                w = new ClockWorker();
                w.postMessage(['action', 'start']);
            }
            w.onmessage = function (event) {
                store.dispatch('updateDatetime', event.data);
            };
        }
    })(store);
}
