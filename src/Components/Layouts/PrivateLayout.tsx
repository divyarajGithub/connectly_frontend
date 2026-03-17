"use client";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
  Popover,
} from "@mui/material";
import { useTheme, alpha, styled } from "@mui/material/styles";
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { usePathname, useRouter } from "next/navigation";

const DRAWER_WIDTH = 260;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: "blur(20px)",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const LogoBox = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: 12,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 22,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}));

const UserProfileCard = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 16,
  background: alpha(theme.palette.primary.main, 0.08),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
}));


const NavItemButton = styled(ListItemButton)<{ "data-active"?: string }>(
  ({ theme }) => ({
    position: "relative",
    margin: "2px 4px",
    padding: "10px 16px",
    borderRadius: 12,
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    '&[data-active="true"]': {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
        transform: "translateX(4px)",
      },
      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: "25%",
        height: "50%",
        width: 4,
        borderRadius: "0 4px 4px 0",
        backgroundColor: theme.palette.primary.main,
      },
    },
    '&[data-active="false"]': {
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.06),
        transform: "translateX(4px)",
      },
    },
  })
);

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 36,
  height: 36,
  border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: "0.2s",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

function PrivateLayout({ children }: { children?: React.ReactNode }) {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setProfileAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileAnchorEl(null);

  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) =>
    setNotificationAnchorEl(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchorEl(null);

  const navItems = [
    { text: "Home", icon: <HomeIcon />, path: "/", badge: 0 },
    { text: "Messages", icon: <QuestionAnswerIcon />, path: "/messages", badge: 5 },
    { text: "Friends", icon: <GroupIcon />, path: "/friends", badge: 2 },
    { text: "Saved", icon: <BookmarkIcon />, path: "/saved", badge: 0 },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings", badge: 0 },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) setMobileOpen(false);
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
      }}
    >
   
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 2,
          minHeight: 64,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <LogoBox>
            <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>
              C
            </Typography>
          </LogoBox>
          <LogoText>Connectly</LogoText>
        </Box>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mx: 2 }} />

    
      <UserProfileCard>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            src="/avatar.jpg"
            sx={{
              width: 44,
              height: 44,
              border: `2px solid ${theme.palette.primary.main}`,
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 14,
                color: theme.palette.text.primary,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              John Doe
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: theme.palette.text.secondary,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              @johndoe
            </Typography>
          </Box>
        </Box>
      </UserProfileCard>

    
      <Box sx={{ flex: 1, px: 1.5, py: 1 }}>
        <Typography
          sx={{
            px: 2,
            py: 1,
            fontSize: 11,
            fontWeight: 600,
            color: theme.palette.text.secondary,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Menu
        </Typography>

        <List disablePadding>
          {navItems.map((item, index) => {
            const isActive = pathname === item.path;

            return (
   
              <NavItemButton
                key={index}
                data-active={String(isActive)}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    transition: "0.2s",
                  }}
                >
                  {item.badge > 0 ? (
                    <Badge
                      badgeContent={item.badge}
                      color="error"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: 10,
                          height: 18,
                          minWidth: 18,
                        },
                      }}
                    >
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  }}
                />
              </NavItemButton>
            );
          })}
        </List>
      </Box>

 
      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <ListItemButton
          onClick={() => console.log("Logout")}
          sx={{
            borderRadius: 3,
            py: 1.3,
            "&:hover": {
              backgroundColor: alpha(theme.palette.error.main, 0.1),
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: theme.palette.error.main }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: 500,
              color: theme.palette.error.main,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

    
      <StyledAppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              display: { md: "none" },
              color: theme.palette.text.primary,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              fontWeight: 600,
              fontSize: 18,
              color: theme.palette.text.primary,
            }}
          >
            Dashboard
          </Typography>

          <Typography
            sx={{
              display: { xs: "block", md: "none" },
              fontWeight: 700,
              fontSize: 20,
              color: theme.palette.primary.main,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Connectly
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <StyledIconButton
              onClick={handleNotificationOpen}
              aria-label="notifications"
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </StyledIconButton>

         
            <StyledAvatar
              src="/avatar.jpg"
              alt="Profile"
              onClick={handleProfileMenuOpen}
            />
          </Box>
        </Toolbar>
      </StyledAppBar>


      <Popover
        open={Boolean(notificationAnchorEl)}
        anchorEl={notificationAnchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ p: 2 }}>
          <Typography fontWeight={600} fontSize={16} sx={{ mb: 2 }}>
            Notifications
          </Typography>
          <Divider sx={{ mb: 1 }} />
          {[1, 2, 3].map((item) => (
            <Box
              key={item}
              sx={{
                py: 1.5,
                px: 1,
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": { backgroundColor: theme.palette.action.hover },
              }}
            >
              <Typography fontSize={14} fontWeight={500}>
                New message received
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                2 minutes ago
              </Typography>
            </Box>
          ))}
        </Box>
      </Popover>

   
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography fontWeight={600} fontSize={14}>John Doe</Typography>
          <Typography fontSize={12} color="text.secondary">john@example.com</Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
          <PersonIcon sx={{ mr: 1.5, fontSize: 20, color: theme.palette.text.secondary }} />
          <Typography fontSize={14}>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
          <SettingsIcon sx={{ mr: 1.5, fontSize: 20, color: theme.palette.text.secondary }} />
          <Typography fontSize={14}>Settings</Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleProfileMenuClose}
          sx={{ py: 1.5, color: theme.palette.error.main }}
        >
          <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
          <Typography fontSize={14}>Logout</Typography>
        </MenuItem>
      </Menu>


      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderRight: "none",
            boxShadow: "4px 0 24px rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

    
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: "100vh",
          backgroundColor: theme.palette.grey[50],
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>
      </Box>
    </Box>
  );
}

export default PrivateLayout;