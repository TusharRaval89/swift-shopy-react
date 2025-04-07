import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Slider, Stack, Typography } from "@mui/material";
import { FaStar } from "react-icons/fa";

const drawerWidth = 270;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [value, setValue] = useState([100, 100000]);
  const [rating, setRating] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const drawer = (
    <div>
      <Toolbar>
        <div>
          <h2>Product</h2>
        </div>
      </Toolbar>
      <Divider />
      <div className="filter-title px-3 mt-3">
        <h6>CATEGORIES</h6>
      </div>
      <div className="filter cnt px-3">
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Electronics" />
          <FormControlLabel control={<Checkbox />} label="Clothes" />
          <FormControlLabel control={<Checkbox />} label="Toys" />
          <FormControlLabel control={<Checkbox />} label="Jewellery" />
          <FormControlLabel control={<Checkbox />} label="Sports" />
          <FormControlLabel control={<Checkbox />} label="Accessories" />
        </FormGroup>
      </div>
      <Divider />
      <div className="filter-title px-3 mt-3">
        <h6>BRANDS</h6>
      </div>
      <div className="filter cnt px-3">
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Apple" />
          <FormControlLabel control={<Checkbox />} label="Amiri" />
          <FormControlLabel control={<Checkbox />} label="Toykraft" />
          <FormControlLabel control={<Checkbox />} label="Tanishq" />
          <FormControlLabel control={<Checkbox />} label="Reebook" />
          <FormControlLabel control={<Checkbox />} label="Rolex" />
        </FormGroup>
      </div>
      <Divider />
      {/* <div className="filter-title px-3 mt-3">
        <h6>PRICE</h6>
      </div>
      <div className="filter cnt px-3">
        <Stack spacing={2} direction="row" sx={{ alignItems: "center", mb: 1 }}>
          <Slider aria-label="Volume" value={value} onChange={handleChange} />
        </Stack>
      </div> */}
      <div className="filter-title px-3 mt-3">
        <h6>PRICE</h6>
      </div>
      <div className="ps-4 pe-3">
        <Stack
          spacing={2}
          direction="row"
          sx={{ alignItems: "center", mb: 1, width: "90%" }}
        >
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={100}
            max={100000}
            step={100}
            sx={{ color: "hotpink" }} // Customize color
          />
        </Stack>
        <Typography sx={{ margin: "10px" }}>
          ₹{value[0].toLocaleString()} - ₹{value[1].toLocaleString()}+
        </Typography>
      </div>
      <Divider />

      <div className="filter-title px-3 mt-3">
        <h6>RATING</h6>
      </div>
      <div className="filter cnt px-3">
        
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className="ms-1"
            color={i < rating ? "gold" : "gray"} // Changes color based on rating
            size={20} // Adjust size if needed
            onClick={() => setRating(i + 1)} // Updates rating on click
            style={{ cursor: "pointer" }} // Makes it clickable
          />
        ))}
      </div>

      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }} className="">
      <CssBaseline />

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              marginTop: "10px",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: "70px",
        }}
      >
        <Typography variant="h6"></Typography>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
