
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

interface NavbarProps {
  title: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

interface ProfileData {
  nama: string;
  email: string;
  sekolah: string;
}

const STORAGE_KEY = "studentapp-profile";

const defaultProfile: ProfileData = {
  nama: "Admin",
  email: "admin@gmail.com",
  sekolah: "SMK Telkom Malang",
};

export default function Navbar({
  title,
  searchValue,
  onSearchChange,
}: NavbarProps) {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(defaultProfile);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    const loadProfile = () => {
      const savedProfile = localStorage.getItem(STORAGE_KEY);

      if (savedProfile) {
        try {
          const parsedProfile: ProfileData = JSON.parse(savedProfile);
          setProfile(parsedProfile);
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    };

    loadProfile();

    const handleProfileUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<ProfileData>;
      setProfile(customEvent.detail);
    };

    window.addEventListener(
      "studentapp-profile-updated",
      handleProfileUpdate
    );

    window.addEventListener("storage", loadProfile);

    return () => {
      window.removeEventListener(
        "studentapp-profile-updated",
        handleProfileUpdate
      );

      window.removeEventListener("storage", loadProfile);
    };
  }, []);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToSettings = () => {
    handleMenuClose();
    navigate("/settings");
  };

  const initial = profile.nama.trim().charAt(0).toUpperCase() || "A";

  return (
    <Box component="header" className="navbar">
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#1E293B",
          margin: 0,
        }}
      >
        {title}
      </h2>

      <Box className="navbar-right">
        {onSearchChange && (
          <TextField
            placeholder="Cari nama, NIS, atau kelas..."
            value={searchValue ?? ""}
            onChange={(e) => onSearchChange(e.target.value)}
            size="small"
            fullWidth
            sx={{
              maxWidth: 280,
              "& .MuiOutlinedInput-root": {
                borderRadius: "9px",
                backgroundColor: "#FFFFFF",
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E2E8F0",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#93C5FD",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2563EB",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon
                      sx={{ color: "#94A3B8", fontSize: 21 }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}

        {/* Profil Admin */}
        <Box
          onClick={handleMenuOpen}
          className="profile-info"
          sx={{
            cursor: "pointer",
            borderRadius: "10px",
            padding: "6px 8px",
            transition: "background 0.2s",
            "&:hover": {
              backgroundColor: "#F1F5F9",
            },
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#2563EB",
              width: 42,
              height: 42,
              fontWeight: 600,
            }}
          >
            {initial}
          </Avatar>

          <Box>
            <p
              style={{
                fontWeight: 700,
                fontSize: "14px",
                margin: 0,
                color: "#1E293B",
              }}
            >
              {profile.nama}
            </p>

            <p
              style={{
                fontSize: "12px",
                margin: "3px 0 0",
                color: "#64748B",
              }}
            >
              Administrator
            </p>
          </Box>

          <KeyboardArrowDownRoundedIcon
            sx={{ color: "#64748B", fontSize: 20 }}
          />
        </Box>

        {/* Dropdown Profil */}
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              sx: {
                width: 250,
                mt: 1,
                borderRadius: "12px",
                boxShadow: "0 8px 25px rgba(15, 23, 42, 0.12)",
              },
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 1,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#2563EB",
                  width: 40,
                  height: 40,
                }}
              >
                {initial}
              </Avatar>

              <Box sx={{ minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#1E293B",
                  }}
                >
                  {profile.nama}
                </p>

                <p
                  style={{
                    margin: "3px 0 0",
                    fontSize: "12px",
                    color: "#64748B",
                    overflowWrap: "anywhere",
                  }}
                >
                  {profile.email}
                </p>
              </Box>
            </Box>

            <p
              style={{
                margin: "8px 0 0",
                fontSize: "12px",
                color: "#64748B",
              }}
            >
              {profile.sekolah}
            </p>
          </Box>

          <Divider />

          <MenuItem
            onClick={goToSettings}
            sx={{ py: 1.3, gap: 1.5, fontSize: "14px" }}
          >
            <PersonOutlineRoundedIcon sx={{ color: "#64748B", fontSize: 20 }} />
            Profil Saya
          </MenuItem>

          <MenuItem
            onClick={goToSettings}
            sx={{ py: 1.3, gap: 1.5, fontSize: "14px" }}
          >
            <SettingsOutlinedIcon sx={{ color: "#64748B", fontSize: 20 }} />
            Pengaturan
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
