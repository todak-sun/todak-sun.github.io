import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { NavItem } from "@/types";
import Link from "next/link";

type Props = {
  handleDrawerToggle: () => void;
  navItems: NavItem[];
};

const DrawerNavItems = ({ handleDrawerToggle, navItems }: Props) => (
  <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
    <Typography variant="h6" sx={{ my: 2 }}>
      MUI
    </Typography>
    <Divider />
    <List>
      {navItems.map(({ title, pathname }) => (
        <ListItem key={title} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link
              href={pathname}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ListItemText primary={title} />
            </Link>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);
export default DrawerNavItems;
