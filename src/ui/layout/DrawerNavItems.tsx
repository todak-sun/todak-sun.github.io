import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

type Props = {
  handleDrawerToggle: () => void;
};

const navItems = ["Home", "About", "Contact"];

const DrawerNavItems = ({ handleDrawerToggle }: Props) => (
  <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
    <Typography variant="h6" sx={{ my: 2 }}>
      MUI
    </Typography>
    <Divider />
    <List>
      {navItems.map((item) => (
        <ListItem key={item} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default DrawerNavItems;
