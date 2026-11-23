
import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menus = [
    {
      title: "Dashboard",
      href: "/",
      icon: <DashboardRoundedIcon />,
    },
    {
      title: "Data Siswa",
      href: "/students",
      icon: <GroupsRoundedIcon />,
    },
    {
      title: "Pengaturan",
      href: "/settings",
      icon: <SettingsRoundedIcon />,
    },
  ];

  const handleClose = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Tombol hamburger dan close */}
      <IconButton
        className={`sidebar-mobile-toggle ${
          mobileOpen ? "menu-open" : ""
        }`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
      >
        {mobileOpen ? (
          <CloseRoundedIcon />
        ) : (
          <MenuRoundedIcon />
        )}
      </IconButton>

      {/* Overlay */}
      {mobileOpen && (
        <Box
          className="sidebar-overlay"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <Box
        component="aside"
        className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}
      >
        <Box className="sidebar-brand">
          <Box className="brand-icon">S</Box>

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 19 }}>
              StudentApp
            </Typography>

            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
            >
              Sistem Data Siswa
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{ fontWeight: 700, fontSize: 11 }}
          className="menu-label"
        >
          MENU UTAMA
        </Typography>

        <Box component="nav" className="sidebar-menu">
          {menus.map((menu) => (
            <NavLink
              key={menu.href}
              to={menu.href}
              end={menu.href === "/"}
              onClick={handleClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "& svg": {
                      fontSize: 20,
                    },
                  }}
                >
                  {menu.icon}
                </Box>

                {menu.title}
              </Box>
            </NavLink>
          ))}
        </Box>

        <Box className="sidebar-footer">
          <Typography
            sx={{ fontSize: 12 }}
            color="text.secondary"
          >
            StudentApp v1.0.0
          </Typography>
        </Box>
      </Box>
    </>
  );
}
