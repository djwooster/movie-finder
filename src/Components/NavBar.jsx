import { useState } from "react";
import Search from "./Search";
import NumResults from "./NumResults";
import Logo from "./Logo";

export default function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
