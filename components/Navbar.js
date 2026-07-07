import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>MyApp</h2>
      <div className="links">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
