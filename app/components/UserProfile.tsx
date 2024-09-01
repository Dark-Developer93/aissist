import Image from "next/image";
import { auth } from "@/auth";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default async function UserProfile() {
  const session = await auth();
  const user = session?.user;

  return (
    <Card className="max-w-sm mx-auto my-8">
      <CardHeader>
        <Image
          src={user?.image || "/default-user-avatar.png"}
          alt="User Avatar"
          width={100}
          height={100}
          className="rounded-full mx-auto"
        />
        <h2 className="text-center text-2xl font-semibold mt-4">
          {user?.name}
        </h2>
        <p className="text-center text-gray-500">{user?.email}</p>
      </CardHeader>
      <CardContent>
        <p className="text-center">
          Welcome to your profile! Here you can manage your personal information
          and settings.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <button className="btn btn-primary">Edit Profile</button>
      </CardFooter>
    </Card>
  );
}
