import { Link } from "react-router-dom";
import Titulo from "../components/Titulos";
import useManageImage from "../hooks/useImageChange";
import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";
import { optionSelect } from "../utils/apiUrl";
import useDataUser from "../hooks/users/useDataUser";

const Users = () => {
  const { register, handleSubmit, errors } = useDataUser();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/home"
        className="text-2xl font-bold text-gray-900 mb-4 bg-green-100 p-2 rounded w-auto text-center hover:bg-green-200 transition-colors"
      >
        Back To Dashboard
      </Link>

      <form
        onSubmit={handleSubmit}
        className="border-b border-gray-900/10 pb-12 bg-white shadow-md rounded-lg flex flex-col p-4"
      >
        <Titulo titulo="User Information" />

        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* First Name */}
          <InputText
            type="text"
            name="nombre"
            label="First Name"
            placeholder="Enter your first name"
            register={register}
            error={errors.nombre?.message}
          />

          {/* Last Name */}
          <InputText
            type="text"
            name="apellido"
            label="Last Name"
            placeholder="Enter your last name"
            register={register}
            error={errors.apellido?.message}
          />

          {/* Email */}
          <InputText
            type="email"
            name="correo"
            label="Email Address"
            placeholder="Enter your email address"
            register={register}
            error={errors.correo?.message}
          />

          {/* Country */}
          <SelectInput
            label="Especiality"
            name="especialidad"
            options={optionSelect}
            register={register}
            error={errors.especialidad?.message}
          />
        </div>
        <div className="mt-6 flex justify-start ">
          <Button type="submit" text="Save User" />
        </div>
      </form>
    </div>
  );
};

export default Users;
