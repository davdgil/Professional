"use client"
// MerchantPage.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Merch from '../components/Merchant/merchantCommerce';

export default function MerchantPage() {

  const [userData, setUserData] = useState([]);
  const router = useRouter();

  useEffect(() => {

    const userCookie = Cookies.get('user');
    const parsedUserData = userCookie ? JSON.parse(userCookie) : null;


    setUserData(parsedUserData);
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez, después del montaje inicial

  console.log("desde michigan", userData);

  const handleCommercesClick = (commerce) => {


    Cookies.set('webPage', JSON.stringify(commerce), { path: '/' });

    router.push(`/merchant/${commerce.id}`)

  };

  return (
    <Merch user={userData} onClick={handleCommercesClick}></Merch>
  );

}
