"use client"

import { useState, useEffect } from "react";

function Merch({ user, onClick }) {
    const [commerces, setCommerces] = useState([]);

    useEffect(() => {
        const fetchCommerces = async () => {
            try {
                console.log("Usuario logged: ", user)
                const res = await fetch("http://localhost:3000/api/commerce");
                const data = await res.json();       
                const userCommerces = data.commerce.filter((u) => u.email === user.email);

                console.log("Comercios encontrados:", userCommerces);
                setCommerces(userCommerces);

            } catch (error) {
                console.error("Error al obtener información del comercio:", error);
            }
        };

        fetchCommerces();

    }, [user]); 

    return (
        <div className="flex flex-col items-center justify-center ">
          <h1 className=" text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl mb-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
              Comercios
            </span>    
          </h1>
          {commerces.map((commerce) => (
            <div
              key={commerce.id}
              className="w-1/2 p-8 bg-slate-300 rounded-lg mb-4 cursor-pointer hover:bg-slate-400"
              onClick={() => onClick(commerce)}
            >
              <p className="text-2xl text-slate-950 mb-2">{commerce.commerceName}</p>
              <hr className="my-6 border-1 border-gray-500" />
              <p className="font-bold text-slate-950">{commerce.id}</p>
              <p className="font-bold text-slate-950">{commerce.email}</p>
            </div>
          ))}
        </div>
      );
      
      
    
    
}

export default Merch;
