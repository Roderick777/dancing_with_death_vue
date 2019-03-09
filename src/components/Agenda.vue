<template>
    <div>
        <v-toolbar card dark color="primary">
            
            <v-toolbar-title>{{ titulo }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn icon dark @click="volver()">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12 mb-3>        
                    <v-card color="accent" class="white--text"> 
                        <v-card-title> <div class="headline">Citas para el día {{fecha}} </div> </v-card-title>
                    </v-card>
                </v-flex>
           
                <v-flex v-for="(hora, index) in citas" :key="hora.id" xs12 sm12 md4 >
                    <v-flex xs12 pb-2 pl-1 pr-2>
                        <v-card color="accent darken-3" class="white--text m-2" v-if="hora.cita == undefined">
                            <v-card-title primary-title>
                                <div> 
                                    <div class="headline">{{ formatoHora(hora.hora) }}</div>
                                    <div contenteditable="true" :id="'editor_'+ index" data-editado="0" @keypress="cambiarEditado(index)">Ingresa aquí tus datos de contacto y presiona el boton <b>AGENDAR</b> para establecer la hora de tu cita con la muerte tu cita</div>
                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn light class="blue--text" @click="agendar(index, hora.hora)">Agendar</v-btn>
                            </v-card-actions>
                        </v-card>

                        <v-card color="grey" class="white--text m-2" v-if="hora.cita != undefined">
                            <v-card-title primary-title>
                                <div> 
                                    <div class="headline">{{ formatoHora(hora.hora) }}</div>
                                </div>
                            </v-card-title>
                            <v-card-text>
                                 Esta Hora fué agendada
                                 <div mt-1>
                                     <b>Contacto</b><br>
                                      {{ hora.cita.contacto }}
                                 </div>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-flex>
            </v-layout>
        </v-container>
        <v-dialog v-model="dialog" max-width="290" >
            <v-card>
                <v-card-title class="headline">Mensaje</v-card-title>

                <v-card-text>
                    Para agendar hora primero tiene que modificar el contenido
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" flat="flat" @click="dialog = false">
                    Entendido
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapState, mapMutations} from 'vuex';
    import {store} from '../store';
    import axios from 'axios'
    import VueAxios from 'vue-axios'

    Vue.use(VueAxios, axios)

    export default {
        store : store,
        data: () => ({
            dialog: false,
        }),
        methods:{
            volver(){
                this.$store.commit('cambiarMenu', 0);
            },

            agendar(index, hora){
                let c           = this;
                let elemento    = document.getElementById('editor_'+ index);
                let contacto    = elemento.innerHTML;
                let editado     = elemento.dataset.editado;
                let datos       = {
                    fecha       : c.$store.state.fecha,
                    hora        : hora,
                    contacto    : contacto
                }
                if(editado == 0){
                    c.dialog = true
                    return;
                }
                c.$store.commit('cambiarCargando', true);
                axios.post(c.$store.state.ruta + 'cita', datos)
                .then(r => r.data)
                .then(cita =>{
                    console.log(cita);
                    c.$store.commit('getCitas', cita)
                    c.$store.commit('cambiarCargando', false);
                });
            },

            formatoHora(hora){
                let horaA = null;
                let horaB = null;
                if(hora>12){
                    horaA = hora - 12 + ' PM';
                    horaB = hora - 12 + 1 + ' PM';
                    return horaA + ' - ' + horaB;
                } else {
                    if(hora == 12){
                        horaA = hora + ' PM';
                        horaB = hora - 12 + 1 + ' PM';
                        return horaA + ' - ' + horaB;
                            
                    } else {
                        horaA = hora + ' AM';
                        horaB = hora + 1 + ' AM';
                        if(hora == 11){
                            horaB = hora + 1 + ' PM';
                        }
                        return horaA + ' - ' + horaB;
                    }
                }  
            },

            cambiarEditado(index){
                let elemento    = document.getElementById('editor_'+ index);
                let editado     = elemento.dataset.editado = 1;
            },

            ...mapMutations(['cambiarFecha, cambiarMenu'])
        },
        computed:{
            titulo(){
                return this.$store.state.menu[this.$store.state.menuActivo].nombre;
            },
            ...mapState(['menu', 'menuActivo', 'fecha', 'cargando', 'citas'])
        }
    }
</script>
<style scoped>

</style>
