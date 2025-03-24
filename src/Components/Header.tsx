import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ModeToggle } from "./Theme/ThemeToggler";

const Header = () => {
  return (
    <header>
      <MaxWidthWrapper>
        <div className="flex justify-between items-center py-4 px-1.5 dark:bg-black/45 border-b bg-white/45  border-muted-foreground/25 backdrop-blur-md">
          <h1 className="poppins-semibold text-2xl !italic">YourJob</h1>
          <ModeToggle />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
