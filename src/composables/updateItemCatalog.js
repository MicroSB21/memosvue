
const updateItem = (item, catalogo) => {
    const error = ref(null);

    try {
        const request = await fetch(`https://localhost:5001/api/${catalogo}/${itemActualizado.id}`,{
             method: 'PUT',
             headers: {
                  'Content-Type': 'application/json',
             },
             body: JSON.stringify(itemActualizado)
        })
    
        if (request.ok) {
            console.log('Actualizado...');
        }
    } catch (error) {
         console.log(error);
    }
}


export default updateItem


