import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <h1 className="text-center">Sign In</h1>
      <SignIn />
    </div>
  );
}