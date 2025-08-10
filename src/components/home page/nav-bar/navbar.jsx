import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import Logo from "./logo";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="p-6 flex justify-between items-center w-nav m-auto ">
      <div className="flex items-center gap-16">
        <Logo />
      </div>
      <div className="flex items-center gap-5">
        <Button
          className="rounded h-10 shadow-none btn-font inter"
          onClick={() => navigate("/Login")}
        >
          Log In
        </Button>
      </div>
    </div>
  );
}
