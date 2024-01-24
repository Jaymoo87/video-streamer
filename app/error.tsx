"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">Uh Oh!</h1>
      <p>Something Went Wrong</p>
      <Button variant={"secondary"} asChild>
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
