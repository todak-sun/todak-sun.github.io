import Drawer from "@mui/material/Drawer";
import DrawerNavItems from "./DrawerNavItems";
import { NavItem } from "../../../types";

type Props = {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  container?: () => HTMLElement;
  drawerWidth: number;
  navItems: NavItem[];
};

const MobileSideNav = ({ mobileOpen, handleDrawerToggle, container, drawerWidth, navItems }: Props) => {
  return (
    <nav>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <DrawerNavItems navItems={navItems} handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
    </nav>
  );
};
export default MobileSideNav;
