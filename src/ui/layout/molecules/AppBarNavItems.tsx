import { NavItem } from "@/types";
import { Box, Button } from "@mui/material";
import Link from "next/link";

type Props = {
  navItems: NavItem[];
};

const AppBarNavItems = ({ navItems }: Props) => (
  <Box sx={{ display: { xs: "none", sm: "block" } }}>
    {navItems.map(({ title, pathname }) => (
      <Button key={title} sx={{ color: "#fff" }}>
        <Link
          href={pathname}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {title}
        </Link>
      </Button>
    ))}
  </Box>
);

export default AppBarNavItems;
