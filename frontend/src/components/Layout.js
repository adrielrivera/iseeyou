import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  Tooltip,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DomainIcon from '@mui/icons-material/Domain';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GitHubIcon from '@mui/icons-material/GitHub';

const drawerWidth = 260;

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Domain Intel', icon: <DomainIcon />, path: '/domain', badge: 'New' },
  { text: 'Email Intel', icon: <EmailIcon />, path: '/email' },
  { text: 'Username Intel', icon: <PersonIcon />, path: '/username' },
  { text: 'IP Intel', icon: <PublicIcon />, path: '/ip' },
  { text: 'About', icon: <InfoIcon />, path: '/about' },
];

function Layout({ children }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main', 
              width: 40, 
              height: 40,
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}
          >
            <VisibilityIcon />
          </Avatar>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            I See You
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
          OSINT Toolkit
        </Typography>
      </Box>
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) {
                  handleDrawerToggle();
                }
              }}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.dark',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {item.text}
                    {item.badge && (
                      <Badge
                        color="secondary"
                        badgeContent={item.badge}
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                } 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Remember to use this tool responsibly and ethically!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Tooltip title="View on GitHub">
            <IconButton 
              color="primary" 
              component="a" 
              href="https://github.com/yourusername/iseeyou" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {menuItems.find((item) => item.path === location.pathname)?.text || 'I See You - OSINT Toolkit'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' } }}>
            Cyber sleuthing made simple
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation menu"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Toolbar />
        {children}
        <Box 
          component="footer" 
          sx={{ 
            mt: 5, 
            pt: 3, 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} I See You OSINT Toolkit. For educational purposes only.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Layout; 