<template>
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Catálogo de {{title}}</h6>
            <button 
              @click="agregar = !agregar" 
              :class="[!agregar ? 'btn-outline-success' : 'btn-outline-danger', 'btn btn-icon btn-3']" 
              type="button"
            >
              <span class="btn-inner--text">{{agregar ? "Cancelar ": " Agregar "}} </span>
              <span class="btn-inner--icon"><i class="fa fa-save"></i></span>
            </button>
            <div v-if="agregar" class="col-md-6">
              <div class="input-group mb-1">
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Agregar elemento al catálogo" aria-describedby="btnAgregarItem" v-model="itemPorAgregar">
                <button class="btn btn-outline-info mb-0" type="button" id="btnAgregarItem" @click="agregarItem">
                  <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
                </button>
              </div>
            </div>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Descripción
                    </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Estado</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <Item v-for="item in datos" :key="item.id" :item="item" @openModal="AbrirModal" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
     
      <Modal :idItem="dataItem" @ActualizarDataCatalog="actualizarItem" />
      
</template>

<script>
import Item from './Item.vue'
import Modal from '../Modal.vue'
import getItem from '../../composables/getItemCatalog'
export default {
    props : ['title', 'data'],
    components:{
        Item,
        Modal
    },
    emits:['update'],
    data(){
      return{
        dataItem: {
          catalogo : this.title,
          data:{}
        },
        datos : [],
        itemPorAgregar : "",
        agregar: false
      }
    },
    created(){
      this.datos = this.data
    },
    beforeUpdate(){
      this.datos = this.data
    },
    methods:{
      AbrirModal(id){
         let modal = new bootstrap.Modal(document.querySelector('#modal-form'));
         
      
         const {load, error, item} =getItem(this.title,id)

         load()

         this.dataItem.data = item;
         modal.show();
      },

      actualizarItem(item){
        let index = this.datos.findIndex(x => x.id == item.id);
        this.datos[index] = item;
      },

      async agregarItem() {
        let newItem = {
          descripcion: this.itemPorAgregar,
          usuario: 'esoriano'
        }
        try {
          const request = await fetch(`https://localhost:5001/api/${this.title}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem)
          })

          if (request.ok) {
            this.$emit('update');
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
}
</script>
