<template>
    <tr>
        <td>
            <div class="d-flex px-2">
                <div class="my-auto">
                    <h6 class="mb-0 text-sm">{{item.id}}</h6>
                </div>
            </div>
        </td>
        <td>
            <p class="text-sm font-weight-bold mb-0">{{item.descripcion}}</p>
        </td>
        <td>
            <span :class="[item.activo ? 'bg-gradient-success': 'bg-gradient-danger', 'badge badge-sm' ]">
                {{item.activo ? 'Activo': 'Inactivo'}}
            </span>
        </td>
        <td class="align-middle text-center">
            <button @click="open(item.id)" class="btn btn-icon btn-3 bg-gradient-info" type="button">
                <span class="btn-inner--icon"><i class="fas fa-edit"></i></span>
                <span class="btn-inner--text">  Editar</span>
            </button>
        </td>
    </tr>
</template>

<script>
export default {
    name: "Item",
    props: ['item'],
    methods:{
        open(id){
            this.$emit('openModal', id)
        }
    }
}
</script>

