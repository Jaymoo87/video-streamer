import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>We Could Not Find Who You Are Looking For</p>
      <Button variant={"secondary"} asChild>
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
