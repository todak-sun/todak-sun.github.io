import { Box, Button } from "@mui/material";

const navItems = ["Home", "About", "Contact"];

const AppBarNavItems = () => (
  <Box sx={{ display: { xs: "none", sm: "block" } }}>
    {navItems.map((item) => (
      <Button key={item} sx={{ color: "#fff" }}>
        {item}
      </Button>
    ))}
  </Box>
);

export default AppBarNavItems;
