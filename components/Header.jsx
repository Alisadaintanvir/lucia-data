import Link from "next/link";
import { verifyAuth } from "@/lib/auth";
import { logout } from "@/actions/authActions";

async function Header() {
  const auth = await verifyAuth();
  return (
    <header className="bg-primary flex items-center justify-center fixed w-full shadow-md">
      <div className="container mx-auto px-4 py-4 overflow-hidden flex justify-between items-center w-full ">
        <div className="logo">
          <Link href="/">
            <h3 className="text-3xl font-bold">Lucia Data</h3>
          </Link>
        </div>

        <nav>
          <ul className="flex gap-8">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/data">Data</Link>
            </li>
          </ul>
        </nav>

        <div className="auth-button flex gap-4 ">
          {auth.user ? (
            <form action={logout}>
              <button
                href="/logout"
                className="bg-red-600 text-white py-2 px-3 rounded-md shadow-sm"
              >
                Logout
              </button>
            </form>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-white text-gray-800 py-2 px-3 rounded-md shadow-sm"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-green-600 text-white py-2 px-3 rounded-md shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
