import { NavLink, Link, useNavigate } from "react-router";
import { LinkIcon } from "lucide-react"; // Make sure you're importing from the correct package
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import Account from "./Account";

const Navbar = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-primary" : "text-muted-foreground";

  const navigate = useNavigate();
  const user = true;

  return (
    <nav className="fixed top-0 container z-50 bg-white/5 backdrop-blur-lg h-18 border-b border-border shadow-lg rounded-b-xl">
      <div className="p-4   flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-6xl bg-primary/10 rounded-lg">
            <LinkIcon className="w-10 h-10 text-primary p-2" />
          </Link>
          <span className="font-bold text-xl sm:text-2xl">NestUrl</span>
        </div>
        <div className="flex gap-4">
          <NavLink to="/" className={linkClasses}>
            Home
          </NavLink>
          <NavLink to="/links/:id" className={linkClasses}>
            Links
          </NavLink>
          <NavLink to="/dashboard" className={linkClasses}>
            Dashboard
          </NavLink>
        </div>
        <div className="flex gap-4">
          <ModeToggle />
          {user ? (
            <Account />
          ) : (
            <Button onClick={() => navigate("/auth")}>Log in</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
