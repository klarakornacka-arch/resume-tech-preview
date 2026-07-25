import Container from "./Container";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const { pathname } = useLocation();

  if (pathname === "/") return null;

  return (
    <footer className="relative z-10 border-t border-white/15 bg-[#050506]/90 py-7 backdrop-blur-2xl">
      <Container className="flex flex-col gap-3 font-mono text-[10px] uppercase text-white/45 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Zhang Zhenyuan</p>
        <p>Product / AI Visual / Oriental Digital Craft</p>
      </Container>
    </footer>
  );
}
