"use client";
import toast from 'react-hot-toast';
const deleteComerces = async (commerceID) => {
    const confirmDelete = window.confirm("¿Estás seguro de querer eliminar este comercio?");
    console.log("Borrar:", commerceID)
    if (!confirmDelete) {
        toast("Operacion cancelada")
        return;
    } else {
        try {
            const response = await fetch('/api/commerce', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commerceID),
            });

            if (!response.ok) {
                toast.error("Error al eliminar el usuario")
                console.error('Error al eliminar el comercio. Código de estado:', response.status);
                return;// Puedes manejar el error de alguna manera, mostrar un mensaje, etc.
            } else {

                toast.loading("Eliminando...", { duration: 2000 })

                setTimeout(() => {

                    toast.success("comercio eliminado")
                }, 2000)


                const result = await response.json();
                console.log(result.message);
                // Puedes mostrar un mensaje de éxito o realizar alguna acción adicional.
            }
        } catch (error) {
            toast.error("Ha ocurrido un error inesperado")
            console.error('Error en la función DELETE:', error);

        } finally {
            setTimeout(() => {
                window.location.reload();
            }, 3000)
        }
    }
}

export default function Commerces( {commerces} ) {
    // El array vacío asegura que el efecto solo se ejecute una vez al montar el componente.

    return (
        <div className="max-w-4xl mx-auto my-8">
            <h2 className="text-3xl text-gray-300 font-bold mb-4">Lista de Comercios</h2>
            {commerces && commerces.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {commerces.map((commerce, index) => (
                        <li key={index} className="bg-white rounded-md overflow-hidden shadow-md">
                            <img
                                src={`https://picsum.photos/300/200?unique=${commerce.id}`}
                                alt={commerce.commerceName}
                                className="w-full h-40 object-cover object-center"
                            />
                            <div className="p-4  h-full ">
                                <h4 className="text-sky-950 text-lg font-bold mb-2">{commerce.commerceName}</h4>
                                <p className="text-gray-900 font-bold">ID: <span className=" text-gray-500  ">{commerce.id}</span></p>
                                <p className="text-gray-900 font-bold">Email: <span className=" text-gray-500  ">{commerce.email || 'No disponible'}</span></p>
                                <p className="text-gray-900 font-bold">Teléfono:<span className=" text-gray-500  "> {commerce.phone || 'No disponible'}</span></p>
                                <p className="text-gray-900 font-bold">CIF: <span className=" text-gray-500  ">{commerce.cif || 'No disponible'}</span></p>
                                <p className="text-gray-900 font-bold">Dirección: <span className=" text-gray-500  ">{commerce.addres || 'No disponible'}</span></p>
                                <div className="mt-4 flex justify-end ">
                                    <button
                                        className="text-blue-500 hover:text-blue-700 font-medium focus:outline-none relative"
                                        onClick={() => deleteComerces(commerce.id)}
                                    >
                                        Eliminar comercio
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-white'>No hay comercios disponibles</p>
            )}
        </div>
    );

}
