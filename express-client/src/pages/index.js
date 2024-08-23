import Image from "next/image";
import { Inter } from "next/font/google";
import UserList from "@/components/user-list";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="max-w-5xl m-auto ">
      <div>
        <h1 className="my-5 text-4xl text-center">User List</h1>
      </div>
      <UserList />
    </main>
  );
}
