import Link from "next/link";
import ButtonSignin from "@/components/ButtonSignin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";

export default function Page() {
  return (
    <>
      <main className="w-full flex">
        <ButtonSignin />
      </main>
    </>
  );
}
