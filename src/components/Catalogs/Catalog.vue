<template>
    <div class="row">
        <div class="col-12">
          <div class="card mb-4">
            <div class="card-header pb-0">
              <h6>Catálogo de {{title}}</h6>
              <button class="btn btn-icon btn-3 btn-outline-success" type="button">
                <span class="btn-inner--text">Agregar  </span>
                <span class="btn-inner--icon"><i class="fa fa-save"></i></span>
              </button>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center justify-content-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Descripción</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Estado</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                      <Item v-for="item in datos" :key="item.id" :item="item" @openModal="AbrirModal"  />
                  </tbody>
                </table>
              </div>
              <pre>
                {{datos}}
              </pre>
            </div>
          </div>
        </div>
      </div>
     
      <Modal :idItem="dataItem" />
      
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
    data(){
      return{
        dataItem: {
          catalogo : this.title,
          data:{}
        },
        datos : []
      }
    },
    created(){
      this.datos = this.data
    },
    methods:{
      AbrirModal(id){
         let modal = new bootstrap.Modal(document.querySelector('#modal-form'));
         
      
         const {load, error, item} =getItem(this.title,id)

         load()

         this.dataItem.data = item;
         modal.show();
      }
    }
}
</script>
