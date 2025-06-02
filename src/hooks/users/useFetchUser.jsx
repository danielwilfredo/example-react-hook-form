import { useEffect, useState } from "react";
import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";

//hook para separar la logica de obtencion de usuarios

const useFetchUser = () => {
  //state para almacenar los datos de los usuarios
  const [dataUser, setDataUser] = useState([]);

  //funcion para obtener los usuarios desde la API
  //se usa useCallback para evitar que la funcion se vuelva a crear en cada renderizado

  const getUsers = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        toast.error("Failed to fetch users");
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setDataUser(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };

  //funcion para obtener un usuario por su id
  //se usa async/await para manejar la asincronía de la llamada a la API

  const getUserById = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        console.log("Failed to fetch user");
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      console.log("Failed to fetch user");
      return null;
    }
  };

  //useEffect para llamar a getUsers cuando el componente se monta
  useEffect(() => {
    getUsers();
  }, []);

  //retornar los datos y las funciones para ser usados en otros componentes
  return {
    dataUser,
    setDataUser,
    getUsers,
    getUserById,
  };
};

export default useFetchUser;
