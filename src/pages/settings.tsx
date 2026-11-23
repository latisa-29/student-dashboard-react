
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  TextField,
  Divider,
  Alert,
} from "@mui/material";

import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

import Navbar from "../components/navbar";

const STORAGE_KEY = "studentapp-profile";

interface ProfileData {
  nama: string;
  email: string;
  sekolah: string;
}

const defaultProfile: ProfileData = {
  nama: "Admin",
  email: "admin@gmail.com",
  sekolah: "SMK Telkom Malang",
};

export default function Settings() {
  const [nama, setNama] = useState(defaultProfile.nama);
  const [email, setEmail] = useState(defaultProfile.email);
  const [sekolah, setSekolah] = useState(defaultProfile.sekolah);

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Ambil data profil yang tersimpan
  useEffect(() => {
    const savedProfile = localStorage.getItem(STORAGE_KEY);

    if (savedProfile) {
      try {
        const profile: ProfileData = JSON.parse(savedProfile);

        setNama(profile.nama);
        setEmail(profile.email);
        setSekolah(profile.sekolah);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Simpan pengaturan
  const handleSave = () => {
    const profile: ProfileData = {
      nama: nama.trim(),
      email: email.trim(),
      sekolah: sekolah.trim(),
    };

    if (!profile.nama || !profile.email || !profile.sekolah) {
      setError("Semua kolom wajib diisi.");
      setSaved(false);
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      profile.email
    );

    if (!emailValid) {
      setError("Format email tidak valid.");
      setSaved(false);
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));

    // Beri tahu Navbar bahwa profil sudah berubah
    window.dispatchEvent(
      new CustomEvent("studentapp-profile-updated", {
        detail: profile,
      })
    );

    setNama(profile.nama);
    setEmail(profile.email);
    setSekolah(profile.sekolah);

    setError("");
    setSaved(true);
  };

  return (
    <Box className="main-content">
      <Navbar title="Pengaturan" />

      <Box className="page-content">
        <Box sx={{ mb: 3 }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#1E293B",
              margin: 0,
            }}
          >
            Pengaturan
          </h2>

          <p
            style={{
              color: "#64748B",
              marginTop: "8px",
              fontSize: "14px",
            }}
          >
            Kelola informasi administrator dan sekolah.
          </p>
        </Box>

        <Card className="settings-card">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                backgroundColor: "#DBEAFE",
                color: "#2563EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PersonOutlineRoundedIcon />
            </Box>

            <Box>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#1E293B",
                  margin: 0,
                }}
              >
                Informasi Administrator
              </h3>

              <p
                style={{
                  fontSize: "12px",
                  color: "#64748B",
                  margin: "4px 0 0",
                }}
              >
                Informasi akun pengelola aplikasi
              </p>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box className="settings-form">
            <TextField
              label="Nama Administrator"
              fullWidth
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
                setSaved(false);
              }}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSaved(false);
              }}
            />

            <TextField
              label="Nama Sekolah"
              fullWidth
              value={sekolah}
              onChange={(e) => {
                setSekolah(e.target.value);
                setSaved(false);
              }}
            />

            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}

            {saved && (
              <Alert severity="success">
                Pengaturan berhasil disimpan!
              </Alert>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{
                width: "fit-content",
                px: 3,
                py: 1.2,
                borderRadius: "9px",
              }}
            >
              Simpan Pengaturan
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
