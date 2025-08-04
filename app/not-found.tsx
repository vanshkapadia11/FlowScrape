"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

function NotFondPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4 uppercase">
          Page Not Found
        </h2>
        <p className="text-sm font-semibold uppercase text-muted-foreground mb-8 max-w-md">
          Don't Worry Even Best Datas Also Gets Lost Sometimes In the Internet!!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={"/"}
            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg:primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm font-semibold">Back To Dashboard!!</span>
          </Link>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          If You belive this a error pls contact our Sir, Vansh Nilesh Kapadia
        </p>
      </div>
    </div>
  );
}

export default NotFondPage;
