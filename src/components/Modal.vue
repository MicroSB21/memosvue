<template>
    <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true"
       >
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <div class="card card-plain">
                        <div class="card-header pb-0 text-left">
                            <h3 class="font-weight-bolder text-info text-gradient">Edición</h3>
                            <p class="mb-0">Modificacion de descripción o estado</p>
                        </div>
                        <div class="card-body">
                            <form role="form text-left">
                                <label>Descripción</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Descripción Elemento"
                                        v-model="idItem.data.descripcion">
                                </div>
                                
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="rememberMe"
                                        v-model="idItem.data.activo">
                                    <label class="form-check-label" for="rememberMe">Estado</label>
                                </div>
                                <div v-if="actualizado"  class="alert alert-success alert-dismissible fade show" role="alert">
                                    <span class="alert-icon"><i class="ni ni-like-2"></i></span>
                                    <span class="alert-text"><strong>Exito!</strong> Se realizó la actualización</span>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                 <div v-if="!actualizado" class="text-center">
                                    <button type="button" @click="GuardarCambio(idItem)"
                                        class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0">Guardar
                                    </button>
                                </div>
                                <div v-else class="text-center">
                                    <button type="button" @click="actualizado = !actualizado" 
                                        class="btn btn-round bg-gradient-danger btn-lg w-100 mt-4 mb-0"
                                        data-bs-dismiss="modal"
                                    >
                                        Cerrar
                                    </button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
    props:['idItem'],
    setup(props){

        const actualizado = ref(false);
        
        const GuardarCambio = async (item) =>{
            const itemActualizado = {...item.data};
            const catalogo = item.catalogo;

            try {
                const request = await fetch(`https://localhost:5001/api/${catalogo}/${itemActualizado.id}`,{
                     method: 'PUT',
                     headers: {
                          'Content-Type': 'application/json',
                     },
                     body: JSON.stringify(itemActualizado)
                })

                if (request.ok) {
                    actualizado.value = true;
                }
            } catch (error) {
                 console.log(error);
            }
        }

        return { GuardarCambio, actualizado }
    }
}
</script>
