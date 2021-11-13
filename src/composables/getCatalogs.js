import { ref } from 'vue'

const getCatalogs = () =>{
    const dataCatalog = ref([]);
    const error = ref(null);
    
    
    const load = async (catalogo) => {
        try {
            const request = await fetch(`https://localhost:5001/api/${catalogo}`)
    
            if (!request.ok) {
                throw Error('no data avaible');
            }
    
            dataCatalog.value = await request.json();
    
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        }
    }

    return { dataCatalog, error, load}
}

export default getCatalogs
