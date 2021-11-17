import { ref } from 'vue'

const getItem = (catalogo,id) =>{
    const item = ref([]);
    const error = ref(null);
    
    
    const load = async () => {
        try {
            const request = await fetch(`https://localhost:5001/api/${catalogo}/${id}`)
    
            if (!request.ok) {
                throw Error('Ese elemento no existe');
            }
    
            item.value = await request.json();
    
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        }
    }

    return { item, error, load}
}

export default getItem
