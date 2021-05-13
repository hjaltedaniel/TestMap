import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { LMap, LTileLayer, LMarker, LControl } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol/Vue2LeafletLocatecontrol'
import Vuex from 'vuex'

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-control', LControl);
Vue.component('l-marker-cluster', Vue2LeafletMarkerCluster)
Vue.component('v-locatecontrol', Vue2LeafletLocatecontrol)

Vue.config.productionTip = false

require('@/assets/main.scss');

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    location: {
      latitude: null,
      longitude: null
    },
    filters: [
      {
        name: "openNow",
        displayName: "Åben nu",
        isChecked: true
      },
      {
        name: "quickTest",
        displayName: "Kviktest",
        isChecked: false
      },
      {
        name: "disabledParking",
        displayName: "Handicapparkering",
        isChecked: false
      },
      {
        name: "levelAccess",
        displayName: "Niveufri adgang",
        isChecked: false
      },
      {
        name: "bookable",
        displayName: "Tidsbestilling kræves",
        isChecked: false
      },
      {
        name: "24hr",
        displayName: "Døgnåben",
        isChecked: false
      }
    ]
  },
  mutations: {
    setUserLocation (state, payload) {
      state.location.latitude = payload.latitude;
      state.location.longitude = payload.longitude;
    },
    setFilters (state, payload) {
      state.filters = payload
    }
  }
})

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
