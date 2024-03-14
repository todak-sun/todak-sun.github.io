import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBarNavItems from "./AppBarNavItems";
import { NavItem } from "../../../types";

type Props = {
  handleDrawerToggle: () => void;
  navItems: NavItem[];
};

const GlobalAppBar = ({ handleDrawerToggle, navItems }: Props) => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
          My Blog
        </Typography>
        <AppBarNavItems navItems={navItems} />
      </Toolbar>
    </AppBar>
  );
};
export default GlobalAppBar;
