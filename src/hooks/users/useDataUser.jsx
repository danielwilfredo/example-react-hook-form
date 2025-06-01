import { useEffect, useState } from "react";
import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const useDataUser = () => {
  const [dataUser, setDataUser] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getUsers = async () => {
    const response = await fetch(url);
    if (!response.ok) {
      toast.error("Failed to fetch users");
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    setDataUser(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const saveUserForm = async (dataForm) => {
    alert("Formulario enviado correctamente");
    console.log("Datos del formulario:", dataForm);
    try {
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
      navigate("/home"); // Redirect to home after saving
    } catch (error) {
      console.log("Error al  enviado:", error);
    } finally {
      reset(); // Reset the form after submission
      getUsers(); // Refresh the user list after saving
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      toast.success("User deleted successfully");
      console.log("User deleted:", response);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      getUsers(); // Refresh the user list after deletion
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    dataUser,
    setDataUser,
    handleChange,
    register,
    handleSubmit: handleSubmit(saveUserForm),
    errors,
    deleteUser,
  };
};

export default useDataUser;
