"use client"
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';


const getUser = async (userEmail, userPass, router) => {

  try {
    const res = await fetch("http://localhost:3000/api/users");
    const data = await res.json();
    console.log(data)

    // Buscar el usuario por el correo electrónico
    const user = data.users.find((u) => u.email === userEmail);

    if (user) {
      console.log("Usuario encontrado:");
      const pass = data.users.find((u) => u.password === userPass);
      if (pass) {
        toast.loading("Redirigiendo a la pagina...", { duration: 1000 })
        const userType = user.userType;
        console.log("Usuario: ", user)
        console.log("Tipo de usuario:", userType);

        switch (userType) {
          case 'user':
            Cookies.set('user', JSON.stringify(user), { path: '/' });
            router.push("/user")
            break;
          case 'admin':
            Cookies.set('user', JSON.stringify(user), { path: '/' });
            router.push("/admin")
            break;
          case 'merchant':
            Cookies.set('user', JSON.stringify(user), { path: '/' });
            if (Cookies.get('user')) {
              console.log(Cookies.get('user'))
            } else {
              console.error('Error al establecer la cookie');
            }
            router.push("/merchant");
            break;
        }
      } else {
        toast.error("Contraseña incorrecta")
      }
      return user;
    } else {
      toast.error("Usuario incorrecto")
      console.log("Usuario no encontrado");

      return null;
    }
  } catch (error) {
   
    return null;
  }
};




function Login() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {

    console.log('Datos del formulario:', data);
    getUser(data.email, data.password, router)
  }

  const privateMode = () => {
    const userTemp ={
      userType: 'incognito'
    }
    Cookies.set('user', JSON.stringify(userTemp), { path: '/' });
    console.error("Error al obtener usuarios:");
    router.push("/user")
  }

  return (

    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-gray-950 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-300 md:text-2xl dark:text-white">
            Inicio de Sesión
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">E-mail</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Ingresa un correo electrónico válido',
                  },
                })}
                id="email"
                className="bg-gray-50 border border-gray-300 text-zinc-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Contraseña</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres',
                  },
                })}
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-zinc-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    //{...register('remember')}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-300 dark:text-gray-300">Recordarme</label>
                </div>
              </div>
              <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Olvidaste la contraseña?</a>
            </div>
            <button
              type="submit"
              className="w-full text-black bg-lime-400 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Iniciar Sesion
            </button>
            <p className="text-sm font-light text-gray-300 dark:text-gray-300">
              No tienes cuenta? <Link href="/register" className="font-medium text-white hover:underline dark:text-primary-500">Registrate</Link>
            </p>
          </form>
          <button
              onClick={privateMode}
              className="w-full text-yellow-50 bg-violet-400 hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Modo Incógnito
            </button>
        </div>
      </div>
    </div>

  );
};

export default Login
