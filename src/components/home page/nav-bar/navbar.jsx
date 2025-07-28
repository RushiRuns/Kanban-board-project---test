import { Button } from "@/components/ui/button";

import Logo from "./logo";

export default function Navbar() {
  return (
    <div className="p-6 flex justify-between items-center w-nav m-auto ">
      <div className="flex items-center gap-16">
        <Logo />
      </div>
      <div className="flex items-center gap-5">
        <Button className="rounded h-10 shadow-none btn-font inter">
          Log In
        </Button>
      </div>
    </div>
  );
}
