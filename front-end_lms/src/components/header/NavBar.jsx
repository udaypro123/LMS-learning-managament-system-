import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
// import downloadImage from '../LandingPage/e-commerce.png';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Navbar = () => {

  const navigate = useNavigate()

  const [state, setState] = React.useState({
    left: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", margin: "10px ", cursor: "pointer" }}>
        <ArrowBackIosNewIcon />
      </Box>
      <List>
        {['Home', 'Products', 'Order', 'Category',].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Setting', 'Logout', 'Contact Us', 'Help Centre'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  const handlesigninpage = () => {
    navigate('/')
  }



  return (
    <AppBar position="static" >
      <Toolbar>
        <div>
          {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(anchor, true)}
              >
                <MenuIcon sx={{ fontSize: 35 }} />
              </IconButton>

              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1, justifyContent: "center" }}>
          {/* <img src={downloadImage} alt="Logo" style={{ height: '50px', margin: '5px', width: "8%", borderTopLeftRadius: "10%", borderTopRightRadius: "10%" }} /> */}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton

            color="inherit"
          >
            <AccountCircle onClick={handlesigninpage} sx={{ fontSize: 35 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

