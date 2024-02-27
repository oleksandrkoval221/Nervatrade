import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

type Inputs = {
  dashboardName: string;
};

const CreateDashboard = ({
  user_id,
  closeModal,
  setDashboards,
  dashboards,
}: {
  user_id: string;
  closeModal: () => void;
  setDashboards: any;
  dashboards: any[];
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
    axios
      .post("/api/dashboard/create", {
        dashboardName,
        user_id,
      })
      .then((res) => {
        if (res.status === 200) {
          setDashboards([...dashboards, res.data]);
          toast("A new dashboard has been created", { type: "success" });
          closeModal();
        }
      })
      .catch((err) => {
        setError(err?.response?.data);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="w-full flex flex-col gap-6 sm:w-[450px] lg:w-[570px]"
    >
      <fieldset className="w-full flex justify-center items-center flex-col">
        <input
          type="text"
          {...register("dashboardName", {
            required: "Dashboard Name is required",
          })}
          className="w-full h-12 bg-[#151A1F] border border-[#343B45] rounded-lg font-medium text-base text-white px-3 !m-0 focus:border-2 focus:border-[#4DF986] placeholder:text-[#343B45]"
          placeholder="Enter a dashboard name"
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
      <div className="flex gap-4">
        <button
          type="button"
          className="w-full h-12 border border-[#343B45] rounded-lg"
          onClick={closeModal}
        >
          <span className="font-semibold text-base text-white">Cancel</span>
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-lg bg-[#00DC41]"
        >
          <span className="font-semibold text-base text-black">Create</span>
        </button>
      </div>
    </form>
  );
};

export default CreateDashboard;
