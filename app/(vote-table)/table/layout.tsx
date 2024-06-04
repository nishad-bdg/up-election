import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="container mx-auto px-8 py-8">{children}</main>;
};

export default Layout;
