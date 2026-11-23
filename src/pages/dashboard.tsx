
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import Navbar from "../components/navbar";
import StatCard from "../components/statcard";
import StudentTable from "../components/studenttable";
import { students, type Student } from "../data/students";

const STORAGE_KEY = "studentapp-data";

export default function Dashboard() {
  const [studentList, setStudentList] = useState<Student[]>(students);

  // Ambil data terbaru dari localStorage
  useEffect(() => {
    const loadStudents = () => {
      const savedData = localStorage.getItem(STORAGE_KEY);

      if (savedData) {
        try {
          const parsedData: Student[] = JSON.parse(savedData);

          if (Array.isArray(parsedData)) {
            setStudentList(parsedData);
          }
        } catch {
          setStudentList(students);
        }
      } else {
        setStudentList(students);
      }
    };

    loadStudents();

    window.addEventListener("studentapp-data-updated", loadStudents);
    window.addEventListener("storage", loadStudents);

    return () => {
      window.removeEventListener("studentapp-data-updated", loadStudents);
      window.removeEventListener("storage", loadStudents);
    };
  }, []);

  // Statistik otomatis
  const totalSiswa = studentList.length;

  const lakiLaki = studentList.filter(
    (student) => student.jenisKelamin === "Laki-laki"
  ).length;

  const perempuan = studentList.filter(
    (student) => student.jenisKelamin === "Perempuan"
  ).length;

  const totalKelas = new Set(
    studentList.map((student) => student.kelas)
  ).size;

  return (
    <Box className="main-content">
      <Navbar title="Dashboard" />

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
            Selamat Datang, Admin!
          </h2>

          <p
            style={{
              color: "#64748B",
              marginTop: "8px",
              fontSize: "14px",
            }}
          >
            Berikut ringkasan informasi data siswa.
          </p>
        </Box>

        <Box className="stats-container">
          <StatCard
            title="Total Siswa"
            value={totalSiswa}
            description="Seluruh siswa"
          />

          <StatCard
            title="Laki-laki"
            value={lakiLaki}
            description="Jumlah siswa laki-laki"
          />

          <StatCard
            title="Perempuan"
            value={perempuan}
            description="Jumlah siswa perempuan"
          />

          <StatCard
            title="Jumlah Kelas"
            value={totalKelas}
            description="Kelas yang tersedia"
          />
        </Box>

        <StudentTable data={studentList} />
      </Box>
    </Box>
  );
}
