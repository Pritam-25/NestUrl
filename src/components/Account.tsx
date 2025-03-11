import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link2Icon, LogOut } from "lucide-react";

const Account = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="text-primary">PM</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Pritam Maity</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {" "}
          <Link2Icon />
          <span>My Links</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">
          <LogOut className="text-red-500" />
          <span> Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Account;
