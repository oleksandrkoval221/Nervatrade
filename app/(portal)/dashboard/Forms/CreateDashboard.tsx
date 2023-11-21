import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

type Inputs = {
  dashboardName: string;
};

const CreateDashboard = ({ user_id }: {
  user_id: string
}) => {
  const [error, setError] = useState<string | null>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      dashboardName: "",
    },
  });

  const formSubmit: SubmitHandler<Inputs> = (form) => {
    const { dashboardName } = form;
    axios.post('/api/dashboard/create', {
      dashboardName,
      user_id
    }).then(res => {
      if (res.status === 201) {
        toast(res.data, { type: 'success' })
      }
    }).catch(err => {
      setError(err?.response?.data);
    })
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)} className="my-8 w-full sm:w-[450px] lg:w-[630px]">
      <fieldset className="w-full flex justify-center items-center flex-col">
        <label
          className="w-full "
          htmlFor="dname"
        >
          Dashboard name
        </label>
        <input
          type="text"
          {...register("dashboardName", {
            required: "Dashboard Name is required",
          })}
          className="p-3 w-full bg-dark-main rounded-lg mt-2"
          placeholder="John's dashboard"
        />
        {errors.dashboardName?.message && (
          <small className="block text-red-600 w-full">
            {errors.dashboardName.message}
          </small>
        )}
      </fieldset>
      {error && (
        <small className="block w-full px-2 text-red-600">{error}</small>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="text-center flex-1 w-full bg-green-main font-semibold rounded-lg p-[0.7rem] px-4 text-black cursor-pointer mt-5"
      >
        Create
      </button>
    </form>
  )
}

export default CreateDashboard;