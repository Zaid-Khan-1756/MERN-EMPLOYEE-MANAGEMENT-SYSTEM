import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-blue-400 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          <h1 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-wide">
            Employee Management System
          </h1>

          <Link
            to={"/create"}
            className="flex items-center gap-2 bg-white text-blue-400 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            <PlusIcon className="size-5" />
            Add Employee
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
