import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="container py-2 lg:py-8">{children}</main>;
};

export default Layout;
