"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./ui/breadcrumb";
import { MobileSidebar } from "./Sidebar";

function BreadcrumbHeader() {
  const pathName = usePathname();
  const path = pathName === "/" ? [""] : pathName?.split("/");
  return (
    <>
      <div className="flex items-center flex-start">
        <MobileSidebar />
        <Breadcrumb>
          <BreadcrumbList>
            {path.map((path, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="uppercase text-sm font-semibold"
                    href={`${path}`}
                  >
                    {path === "" ? "Home" : path}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
}

export default BreadcrumbHeader;
