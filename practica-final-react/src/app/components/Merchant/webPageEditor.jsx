// WebPageEditor.jsx
import React from "react";
import { useForm } from "react-hook-form";

const WebPageEditor = ({ onSave, onCancel, initialData }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData,
  });
  const reviews = []

  const handleSave = async (data) => {
    // Convierte la imagen a base64 antes de enviarla al servidor
    const photosBase64 = await convertImagesToBase64(data.photos);

    const webPage = {
      id: initialData.id,
      ...data,
      likes: 0,
      dislikes: 0,
      reviews: [],
      photos: photosBase64, // Adjunta la imagen en formato base64 al objeto
    };

    onSave(webPage);
  };


  const convertImagesToBase64 = async (images) => {
    // Maneja la conversión de múltiples imágenes a base64
    const base64Promises = Array.from(images).map(async (image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(image);
      });
    });

    return Promise.all(base64Promises);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="bg-slate-700 p-4 rounded shadow-md">
        <label className="block mb-2">
          Título:
          <input
            type="text"
            name="title"
            {...register("title")}
            className="w-full border rounded p-2 mt-1 text-slate-950"
          />
        </label>
        <label className="block mb-2">
          Descripción:
          <textarea
            name="description"
            {...register("description")}
            className="w-full border rounded p-2 mt-1 text-slate-950"
          />
        </label>
        <label className="block mb-2">
          Ciudad:
          <select
            name="city"
            {...register("city")}
            className="w-full border rounded p-2 mt-1 text-slate-950"
          >
            <option value="">Selecciona una ciudad</option>
            <option value="Madrid">Madrid</option>
            <option value="Alcalá de Henares">Alcalá de Henares</option>
            <option value="Las Rozas">Las Rozas</option>
            <option value="Alcobendas">Alcobendas</option>
            <option value="Fuenlabrada">Fuenlabrada</option>
            <option value="Getafe">Getafe</option>
            <option value="Leganes">Leganes</option>
            
          </select>
        </label>
        <label className="block mb-2">
          Fotos:
          <input
            type="file"
            name="photos"
            {...register("photos")}
            multiple
            className="w-full border rounded p-2 mt-1"
          />
        </label>
        <label className="block mb-2">
          Dirección:
          <input
            type="text"
            name="addres"
            {...register("addres")}
            className="w-full border rounded p-2 mt-1 text-slate-950"
          />
        </label>
        <label className="block mb-2">
          Nombre del Comercio:
          <input
            type="text"
            name="commerceName"
            {...register("commerceName")}
            className="w-full border rounded p-2 mt-1 text-slate-950"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="text"
            name="email"
            {...register("email")}
            className="w-full border rounded p-2 mt-1 text-slate-950"
          />
        </label>
        <label className="block mb-2">
          Teléfono:
          <input
            type="text"
            name="phone"
            {...register("phone")}
            className="w-full border rounded p-2 mt-1 text-slate-950"
          />
        </label>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default WebPageEditor;
