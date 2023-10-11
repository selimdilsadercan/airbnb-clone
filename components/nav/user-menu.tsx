"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import { useRouter } from "next/navigation";

import Avatar from "../avatar";
import MenuItem from "./menu-item";
import useRentModal from "@/hooks/use-rent-modal";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";

////

function UserMenu() {
  //hooks
  const { isSignedIn } = useAuth();
  const user = useUser().user;
  const userImage = user?.imageUrl;
  const { signOut } = useClerk();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const rentModal = useRentModal();

  //open dropwdown
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!isSignedIn) return router.push("/sign-in");
    rentModal.onOpen();
  }, [rentModal]);

  ////

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100" onClick={onRent}>
          Airbnb your home
        </div>
        <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={userImage} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {user && (
              <>
                <MenuItem label="My trips" onClick={() => router.push("/trips")} />
                <MenuItem label="My favorites" onClick={() => router.push("/favorites")} />
                <MenuItem label="My reservations" onClick={() => router.push("/reservations")} />
                <MenuItem label="My properties" onClick={() => router.push("/properties")} />
                <MenuItem label="Airbnb your home" onClick={onRent} />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            )}
            {!user && (
              <>
                <MenuItem label="Login" onClick={() => router.push("/sign-in")} />
                <MenuItem label="Sign up" onClick={() => router.push("/sign-up")} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
