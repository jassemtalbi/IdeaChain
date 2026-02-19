import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Box } from "@mui/material";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#050a14" }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
