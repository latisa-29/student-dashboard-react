
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Navbar from "../components/navbar";
import StudentTable from "../components/studenttable";

import { students, type Student } from "../data/students";

const STORAGE_KEY = "studentapp-data";

const initialForm = {
  nama: "",
  nis: "",
  kelas: "",
  jenisKelamin: "Laki-laki" as Student["jenisKelamin"],
  status: "Aktif" as Student["status"],
};

export default function Students() {
  const [studentList, setStudentList] = useState<Student[]>(students);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(initialForm);
  const [ready, setReady] = useState(false);

  // Ambil data siswa dari localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        const parsedData: Student[] = JSON.parse(savedData);

        if (Array.isArray(parsedData)) {
          setStudentList(parsedData);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setReady(true);
  }, []);

  // Simpan data setiap kali daftar siswa berubah
  useEffect(() => {
    if (!ready) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(studentList)
    );

    window.dispatchEvent(
      new Event("studentapp-data-updated")
    );
  }, [studentList, ready]);

  // SEARCH DATA SISWA
  const filteredStudents = studentList.filter((student) => {
    const keyword = search.trim().toLowerCase();

    return (
      student.nama.toLowerCase().includes(keyword) ||
      student.nis.toLowerCase().includes(keyword) ||
      student.kelas.toLowerCase().includes(keyword) ||
      student.jenisKelamin.toLowerCase().includes(keyword)
    );
  });

  // BUKA FORM TAMBAH
  const handleAdd = () => {
    setEditingId(null);
    setForm(initialForm);
    setDialogOpen(true);
  };

  // BUKA FORM EDIT
  const handleEdit = (student: Student) => {
    setEditingId(student.id);

    setForm({
      nama: student.nama,
      nis: student.nis,
      kelas: student.kelas,
      jenisKelamin: student.jenisKelamin,
      status: student.status,
    });

    setDialogOpen(true);
  };

  // HAPUS SISWA
  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus data siswa ini?"
    );

    if (!confirmed) return;

    setStudentList((current) =>
      current.filter((student) => student.id !== id)
    );
  };

  // SIMPAN DATA
  const handleSubmit = () => {
    const nama = form.nama.trim();
    const nis = form.nis.trim();
    const kelas = form.kelas.trim();

    if (!nama || !nis || !kelas) {
      alert("Nama, NIS, dan kelas wajib diisi.");
      return;
    }

    const duplicateNis = studentList.some(
      (student) =>
        student.nis.toLowerCase() === nis.toLowerCase() &&
        student.id !== editingId
    );

    if (duplicateNis) {
      alert("NIS sudah digunakan oleh siswa lain.");
      return;
    }

    if (editingId !== null) {
      // UPDATE DATA
      setStudentList((current) =>
        current.map((student) =>
          student.id === editingId
            ? {
                ...student,
                nama,
                nis,
                kelas,
                jenisKelamin: form.jenisKelamin,
                status: form.status,
              }
            : student
        )
      );
    } else {
      // TAMBAH DATA
      const newId =
        studentList.length > 0
          ? Math.max(...studentList.map((student) => student.id)) + 1
          : 1;

      const newStudent: Student = {
        id: newId,
        nama,
        nis,
        kelas,
        jenisKelamin: form.jenisKelamin,
        status: form.status,
      };

      setStudentList((current) => [...current, newStudent]);
    }

    handleClose();
  };

  // TUTUP FORM
  const handleClose = () => {
    setDialogOpen(false);
    setForm(initialForm);
    setEditingId(null);
  };

  return (
    <Box className="main-content">
      <Navbar
        title="Data Siswa"
        searchValue={search}
        onSearchChange={setSearch}
      />

      <Box className="page-content">
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#1E293B",
                margin: 0,
              }}
            >
              Daftar Siswa
            </h2>

            <p
              style={{
                color: "#64748B",
                marginTop: "8px",
                fontSize: "14px",
              }}
            >
              Kelola seluruh data siswa yang terdaftar.
            </p>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={handleAdd}
            sx={{
              bgcolor: "#2563EB",
              borderRadius: "9px",
              px: 2.5,
              py: 1.2,
              "&:hover": {
                bgcolor: "#1D4ED8",
              },
            }}
          >
            Tambah Siswa
          </Button>
        </Box>

        <StudentTable
          data={filteredStudents}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: "#1E293B",
          }}
        >
          {editingId !== null
            ? "Edit Data Siswa"
            : "Tambah Siswa"}
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 1,
            }}
          >
            <TextField
              label="Nama Siswa"
              placeholder="Masukkan nama siswa"
              fullWidth
              value={form.nama}
              onChange={(e) =>
                setForm({ ...form, nama: e.target.value })
              }
            />

            <TextField
              label="NIS"
              placeholder="Masukkan NIS"
              fullWidth
              value={form.nis}
              onChange={(e) =>
                setForm({ ...form, nis: e.target.value })
              }
            />

            <TextField
              label="Kelas"
              placeholder="Contoh: XII-A"
              fullWidth
              value={form.kelas}
              onChange={(e) =>
                setForm({ ...form, kelas: e.target.value })
              }
            />

            <TextField
              select
              label="Jenis Kelamin"
              fullWidth
              value={form.jenisKelamin}
              onChange={(e) =>
                setForm({
                  ...form,
                  jenisKelamin: e.target.value as Student["jenisKelamin"],
                })
              }
            >
              <MenuItem value="Laki-laki">Laki-laki</MenuItem>
              <MenuItem value="Perempuan">Perempuan</MenuItem>
            </TextField>

            <TextField
              select
              label="Status"
              fullWidth
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as Student["status"],
                })
              }
            >
              <MenuItem value="Aktif">Aktif</MenuItem>
              <MenuItem value="Tidak Aktif">Tidak Aktif</MenuItem>
            </TextField>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Batal
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: "#2563EB",
              "&:hover": {
                bgcolor: "#1D4ED8",
              },
            }}
          >
            {editingId !== null
              ? "Simpan Perubahan"
              : "Simpan Siswa"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
