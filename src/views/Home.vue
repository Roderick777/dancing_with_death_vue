<template>
    <div>
        <template v-if="menuActivo==0">
            <calendario></calendario>
        </template>

        <v-slide-y-transition>
            <template v-if="menuActivo==1">
                <agenda></agenda>
            </template>
        </v-slide-y-transition>

        <v-dialog v-model="cargando" hide-overlay persistent width="300" >
            <v-card color="accent" dark>
                <v-card-text>
                    Espere un momento ...
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

    import HelloWorld from '../components/HelloWorld'
    import Calendario from '../components/Calendario'
    import Agenda from '../components/Agenda'

    import {mapState, mapMutations} from 'vuex';
    import {store} from '../store';
    import Vue from 'vue'
    import VueMoment from 'vue-moment'
    import moment from 'moment-timezone'
    Vue.use(VueMoment,{ moment})

    export default {
        store: store,
        created(){
            let fecha =  moment().format('YYYY-MM-DD')
            this.$store.commit('cambiarFecha', fecha)
        },
        components: {
            HelloWorld,
            Calendario,
            Agenda
        }, 
        computed:{
            ...mapState(['menu', 'menuActivo', 'fecha', 'cargando'])
        }
    }
</script>
