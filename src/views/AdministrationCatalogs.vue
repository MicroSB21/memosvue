<template>
  <div class="row">
    <h5>Administración de Catalogos</h5>
    <hr />
    <div class="form-group form-select-sm" aria-label=".form-select-sm example">
      <label for="selectCatalogos">Seleccione una opción</label>
      <select @change="changeCatalog" v-model="catalogoSeleccionado" class="form-control" id="selectCatalogos">
        <option value="0" selected>Seleccione el Catalogo</option>
        <option value="Accion">Acciones</option>
        <option value="Estado">Estados</option>
        <option value="Tipo">Tipo de Memos</option>
        <option value="Destinatario">Tipo de Destinatario</option>
      </select>
      <hr />
    </div>
    <div v-if="catalogoSeleccionado ==='0'">
      <div class="alert alert-info " role="alert">
        <span class="alert-icon"><i class="ni ni-like-2"></i></span>
        <span class="alert-text"><strong>Warning!</strong> Seleccione una Opción</span>
      </div>
    </div>
    <div class="col s12" v-if="dataCatalog.length">
      <Catalog :data="dataCatalog" :title="catalogoSeleccionado" @update="actualizardata"/>
    </div>
  </div>
</template>

<script>
  import Catalog from '../components/Catalogs/Catalog.vue'
  import { ref } from 'vue';
  import getCatalogs from '../composables/getCatalogs'
  export default {
    emits: ['update'],
    setup() {
      const catalogoSeleccionado = ref('0');
      const { dataCatalog, error, load } = getCatalogs()

      const changeCatalog = () => {
        load(catalogoSeleccionado.value)
      }

      const actualizardata = () => {
        load(catalogoSeleccionado.value)
      }

      return {
        catalogoSeleccionado,
        dataCatalog,
        changeCatalog,
        actualizardata
      }
    },
    components: {
      Catalog
    }
  }
</script>