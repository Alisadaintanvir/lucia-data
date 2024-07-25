import Link from "next/link";
function Header() {
  return (
    <header className=" flex items-center justify-center fixed w-full shadow-md">
      <div className="container mx-auto px-4 py-4 overflow-hidden flex justify-between items-center w-full ">
        <div className="logo">
          <Link href="/">
            <h3 className="text-3xl font-bold">Auth Lucia</h3>
          </Link>
        </div>

        <nav>
          <ul className="flex gap-8">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/login">Protected</Link>
            </li>
          </ul>
        </nav>

        <div className="auth-button flex gap-4 ">
          <Link
            href="/login"
            className="bg-white text-gray-800 py-2 px-3 rounded-md"
          >
            Login
          </Link>
          <Link href="/register" className="bg-green-600 py-2 px-3 rounded-md">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
