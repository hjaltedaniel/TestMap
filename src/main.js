import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol/Vue2LeafletLocatecontrol'

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-marker-cluster', Vue2LeafletMarkerCluster)
Vue.component('v-locatecontrol', Vue2LeafletLocatecontrol)

Vue.config.productionTip = false

require('@/assets/main.scss');

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
