import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useUserAction = (getUsers) => {
  const navigate = useNavigate();

  //funcion para eliminar un usuario por su id
  // se usa async/await para manejar la asincronía de la llamada a la API
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      toast.success("User deleted successfully");
      console.log("User deleted:", response);
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      getUsers();
    }
  };
  const handleUpdateUser = (id) => {
    navigate(`/users/${id}`);
  };

  return {
    deleteUser,
    handleUpdateUser,
  };
};

export default useUserAction;
