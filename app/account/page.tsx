import Header from "@/components/Header";
import React from "react";
import AccountContent from "./components/AccountContent";
import { ModeToggle } from "@/components/ModeToggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Account = () => {
  return (
    <div className=" rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-3xl font-semibold">Account Setting</h1>
        </div>
      </Header>
      <AccountContent />
      <Card className="mx-auto mt-6">
        <CardHeader>
          <CardTitle className="flex gap-3  items-center">
            <div>Theme</div> <ModeToggle />
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Account;
