import { useEffect, useState } from "react";
import { url } from "../../utils/apiUrl"; // URL de la API
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetchUser from "../../hooks/users/useFetchUser";

const useDataUser = (methods) => {
  const [dataUser, setDataUser] = useState([]);
  const { getUserById, getUsers } = useFetchUser();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  // save user form
  // funcion para guardar el formulario de usuario y enviar los datos a la API
  const saveUserForm = async (dataForm) => {
    try {
      // enviar la solicitud POST a la API
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Failed to add user");
        throw new Error("Failed to add user");
      }
      toast.success("User saved successfully");
      navigate("/home"); // Redirigir a la página de inicio después de guardar
    } catch (error) {
      console.log("Error al  enviado:", error);
    } finally {
      reset(); // reiniciar el formulario después de enviar
      getUsers(); // obtener la lista actualizada de usuarios
    }
  };

  // Función para editar un usuario
  // Esta función se llama cuando se envía el formulario de edición
  // y envía una solicitud PUT a la API para actualizar los datos del usuario

  const editUser = async (dataForm) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Failed to update user");
        throw new Error("Failed to update user");
      }
      toast.success("User updated successfully");
      navigate("/home"); // Redirect to home after updating
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    } finally {
      reset(); // Reset the form after submission
      getUsers(); // Refresh the user list after updating
    }
  };

  // Esta función se llama cuando se envía el formulario
  // y decide si guardar un nuevo usuario o editar uno existente
  // dependiendo de si hay un id presente en los parámetros de la URL
  // Si hay un id, se llama a editUser, de lo contrario se llama a saveUserForm

  const handleUserAction = (dataForm) => {
    if (id) {
      editUser(dataForm);
    } else {
      saveUserForm(dataForm);
    }
  };

  // Función para manejar la actualización de un usuario
  // Esta función se llama cuando se hace clic en el botón de editar
  // y redirige al usuario a la página de edición del usuario
  // pasando el id del usuario como parámetro en la URL
  const handleUpdateUser = (id) => {
    navigate(`/users/${id}`);
  };

  // Cargar los datos del usuario por id
  // Esta función se llama para obtener los datos del usuario cuando el componente se monta o cuando cambia el id
  const loadUser = async () => {
    if (id) {
      const user = await getUserById(id);
      if (user) {
        reset({
          nombre: user?.nombre,
          apellido: user?.apellido,
          correo: user?.correo,
          especialidad: user?.especialidad,
        });
      }
    }
  };

  // useEffect para cargar los datos del usuario cuando el componente se monta o cuando cambia el id
  useEffect(() => {
    loadUser();
  }, [id]); // Dependencia en id para recargar los datos si cambia

  return {
    dataUser,
    setDataUser,
    register,
    handleSubmit: handleSubmit(handleUserAction),
    errors,
    getUserById,
    handleUpdateUser,
    loadUser,
  };
};

export default useDataUser;
