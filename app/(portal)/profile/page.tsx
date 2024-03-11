"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import UsernameModal from "./Modals/UsernameModal";
import EmailModal from "./Modals/EmailModal";
import PasswordModal from "./Modals/PasswordModal";

type User = {
  _id: String;
  username: String;
  email: String;
  password: String;
  updatedAt: Date;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>();
  const session = useSession();
  const [openedUsernameModal, setOpenedUsernameModal] =
    useState<boolean>(false);
  const [openedEmailModal, setOpenedEmailModal] = useState<boolean>(false);
  const [openedPasswordModal, setOpenedPasswordModal] =
    useState<boolean>(false);
  const getProfile = () => {
    if (session.data) {
      // @ts-ignore
      axios.get(`api/profile/get?id=${session.data.user._id}`).then((res) => {
        setUser(res.data);
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, [session]);

  return (
    <>
      <div className="w-full mx-auto">
        <div className="w-full h-16 flex items-center justify-between px-6 border-b border-b-gray-border">
          <h1 className="font-medium text-lg text-[#626D7C]">Profile</h1>
        </div>
        <div className="px-5 md:px-7">
          <div className="w-full h-20 md:h-[170px] bg-gray-border rounded" />
          <div className="flex flex-col items-center gap-5 md:gap-[100px]">
            <div className="w-full grid gap-7 -mt-10 md:-mt-[60px]">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center bg-gray-border w-20 h-20 md:w-[120px] md:h-[120px] rounded-full border-2 border-[#00DC41] mb-4 md:mb-6">
                  <img src="/images/logo-white-1.png" alt="" />
                </div>
                <span className="font-semibold text-2xl text-white mb-2 md:mb-4">
                  {user?.username}
                </span>
                <span className="font-medium text-lg text-[#626D7C]">
                  {user?.email}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[50px]">
                <div className="border border-gray-border rounded px-5 py-4 md:px-7 md:py-6">
                  <div className="grid gap-2 pb-6 border-b border-b-gray-border">
                    <p className="font-medium text-xl leading-[34px]">
                      Basic Information
                    </p>
                    <p className="font-medium text-sm leading-5">
                      Your user name will be visible to others
                    </p>
                  </div>
                  <div className="font-medium text-sm">
                    <div className="h-10 md:h-14 flex items-center justify-between border-b border-b-gray-border">
                      <div className="flex items-center gap-6">
                        <span className="inline-block w-[70px] text-[#626D7C]">
                          Username
                        </span>
                        <span>{user?.username}</span>
                      </div>
                      <img
                        src="/icons/pen.svg"
                        className="cursor-pointer"
                        onClick={() => setOpenedUsernameModal(true)}
                        alt=""
                      />
                    </div>
                    <div className="h-10 md:h-14 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <span className="inline-block w-[70px] text-[#626D7C]">
                          Email
                        </span>
                        <span>{user?.email}</span>
                        <img src="/icons/check.svg" alt="" />
                      </div>
                      <img
                        src="/icons/pen.svg"
                        className="cursor-pointer"
                        onClick={() => setOpenedEmailModal(true)}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="border border-gray-border rounded px-5 py-4 md:px-7 md:py-6">
                  <div className="grid gap-2 pb-6 border-b border-b-gray-border">
                    <p className="font-medium text-xl leading-[34px]]">
                      Password
                    </p>
                    <p className="font-medium text-sm leading-5">
                      A secure password helps protect your account
                    </p>
                  </div>
                  <div className="font-medium text-sm">
                    <div className="h-10 md:h-14 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <span className="inline-block w-[70px]">
                          ****************
                        </span>
                      </div>
                      <img
                        src="/icons/pen.svg"
                        className="cursor-pointer"
                        onClick={() => setOpenedPasswordModal(true)}
                        alt=""
                      />
                    </div>
                    <div className="flex items-center justify-between text-[#626D7C]">
                      Last changed{" "}
                      {moment(user?.updatedAt).format("DD.MM.YYYY")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="h-10 pl-2.5 pr-[18px] rounded-lg border border-gray-border flex items-center gap-2"
              onClick={() => signOut()}
            >
              <img src="/icons/logout.svg" alt="" />
              <span className="font-sembold text-sm">Log out</span>
            </button>
          </div>
        </div>
      </div>

      <UsernameModal
        opened={openedUsernameModal}
        onClose={() => {
          setOpenedUsernameModal(false);
          getProfile();
        }}
      />
      <EmailModal
        opened={openedEmailModal}
        onClose={() => {
          setOpenedEmailModal(false);
          getProfile();
        }}
      />
      <PasswordModal
        opened={openedPasswordModal}
        onClose={() => {
          setOpenedPasswordModal(false);
          getProfile();
        }}
      />
    </>
  );
}
