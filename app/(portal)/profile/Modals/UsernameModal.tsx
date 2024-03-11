"use client";
import { useState } from "react";
import AppModal from "@/components/AppModal";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  username: string;
};

const UsernameModal = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const session = useSession();
  const [error, setError] = useState<string | null>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
    },
  });

  const formSubmit: SubmitHandler<Inputs> = (form) => {
    const { username } = form;
    axios
      .post("/api/profile/update", {
        // @ts-ignore
        id: session.data.user._id,
        username,
      })
      .then((res) => {
        if (res.status === 200) onClose();
      })
      .catch((err) => {
        setError(err?.response?.data);
      });
  };

  return (
    <AppModal isOpen={opened} closeModal={onClose} className="!min-w-[348px]">
      <h2 className="font-semibold text-2xl leading-8 mb-4">Change username</h2>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col gap-6 w-[300px]"
      >
        <fieldset className="w-full flex justify-center items-start flex-col">
          <label className="font-medium text-sm mb-2">New username</label>
          <input
            type="text"
            {...register("username", {
              required: "Username is required",
            })}
            className="w-full h-8 bg-[#151A1F] border border-[#343B45] rounded font-medium text-sm text-white px-2 !m-0 focus:border-2 focus:border-[#4DF986] placeholder:text-[#343B45]"
            placeholder="Enter your username"
          />
          {errors.username?.message && (
            <small className="block text-red-600 w-full">
              {errors.username.message}
            </small>
          )}
        </fieldset>
        {error && (
          <small className="block w-full px-2 text-red-600">{error}</small>
        )}
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[95px] h-8 flex items-center justify-center rounded-lg bg-[#00DC41]"
          >
            <span className="font-semibold text-xs text-black">Done</span>
          </button>
          <button
            type="button"
            className="w-[95px] h-8 flex items-center justify-center border border-[#343B45] rounded-lg"
            onClick={onClose}
          >
            <span className="font-semibold text-xs text-white">Cancel</span>
          </button>
        </div>
      </form>
    </AppModal>
  );
};

export default UsernameModal;
