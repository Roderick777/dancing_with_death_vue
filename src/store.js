import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { stat } from 'fs';

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const store = new Vuex.Store({
    state: {
        menu: [
            {nombre:'Calendario - Dancing with the death'},
            {nombre:'Agenda - Dancing with the death'}
        ],
        menuActivo:0,
        fecha:'',
        cargando: false,
        ruta: 'http://134.209.122.18/api/',
        citas: [],
        weekday: null,
    },
    mutations: {
        cambiarFecha(state, fecha){
            state.fecha = fecha;
        },
        cambiarMenu(state, menuIndex){
            state.menuActivo = menuIndex;
        },
        cambiarCargando(state, estado){
            state.cargando = estado;
        },
        getCitas(state, citas){
            state.citas = citas;
            this.state.cargando = false;
        },
        cambiarWeekday(state, weekday){
            state.weekday = weekday;
        },
    },
    actions: {
        loadCitas({ commit }, fecha){
            this.state.cargando = true;
            axios.get(this.state.ruta + 'cita?fecha='+fecha)
            .then(r => r.data)
            .then(citas =>{
                console.log(citas);
                commit('getCitas', citas)
                this.state.cargando = false;
            })
        }

    }
})
