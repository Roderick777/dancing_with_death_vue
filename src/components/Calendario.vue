<template>
    <v-layout wrap>
        <v-toolbar card dark color="primary">
            <v-toolbar-title>{{ titulo }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
        </v-toolbar>
        <v-flex xs12 >
            <v-sheet height="500">
                <v-calendar ref="calendar" v-model="today" :type="type" :end="end" :now="today" color="primary">
                    <template v-slot:day="day">
                    <div class="day" v-if="day.weekday!= 0 && day.weekday!= 6">
                        <v-btn  flat icon color="accent" style="cursor: pointer" @click="selectDay(day)">
                            <v-icon dark left >
                                list
                            </v-icon>
                        </v-btn>
                    </div>
                </template>
                </v-calendar>
            </v-sheet>
        </v-flex>

        <v-flex sm6 xs6  lg6  class="text-sm-left text-xs-center">
            <v-btn color="primary" @click="$refs.calendar.prev()">
                <v-icon dark left >
                    keyboard_arrow_left
                </v-icon>
            </v-btn>
        </v-flex>

        <v-flex sm6 xs6  lg6 class="text-sm-right text-xs-center">
            <v-btn color="primary" @click="$refs.calendar.next()">
                <v-icon right dark >keyboard_arrow_right</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import {store} from '../store';

    export default {
        store: store,
        created(){
            this.today = this.$store.state.fecha;
            this.start = this.$store.state.fecha;
        },
        data: () => ({
            type: 'month',
            start: '2019-01-01',
            today: null,
            end: '2019-01-06',
            typeOptions: [
                { text: 'Day', value: 'day' },
                { text: '4 Day', value: '4day' },
                { text: 'Week', value: 'week' },
                { text: 'Month', value: 'month' },
                { text: 'Custom Daily', value: 'custom-daily' },
                { text: 'Custom Weekly', value: 'custom-weekly' }
            ]
        }),
        methods:{
            selectDay: function (evento){
                this.today = evento.date;
                this.$store.commit('cambiarFecha', this.today);
                this.$store.commit('cambiarMenu', 1);
                this.$store.commit('cambiarWeekday', evento.weekday)
                this.$store.dispatch('loadCitas', evento.date)
            },
            ...mapMutations(['cambiarFecha','cambiarMenu','cambiarWeekday'])
        },
        computed:{
            titulo(){
                return this.$store.state.menu[this.$store.state.menuActivo].nombre;
            },
            ...mapState(['menu', 'menuActivo', 'fecha', 'weekday'])
        }
    }
</script>
<style scoped>

</style>
