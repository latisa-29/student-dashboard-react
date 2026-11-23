
export interface Student {
  id: number;
  nama: string;
  nis: string;
  kelas: string;
  jenisKelamin: "Laki-laki" | "Perempuan";
  status: "Aktif" | "Tidak Aktif";
}

export const students: Student[] = [
  {
    id: 1,
    nama: "Andi Saputra",
    nis: "001",
    kelas: "XII-A",
    jenisKelamin: "Laki-laki",
    status: "Aktif",
  },
  {
    id: 2,
    nama: "Budi Santoso",
    nis: "002",
    kelas: "XII-B",
    jenisKelamin: "Laki-laki",
    status: "Aktif",
  },
  {
    id: 3,
    nama: "Citra Amelia",
    nis: "003",
    kelas: "XII-A",
    jenisKelamin: "Perempuan",
    status: "Aktif",
  },
  {
    id: 4,
    nama: "Dina Putri",
    nis: "004",
    kelas: "XI-A",
    jenisKelamin: "Perempuan",
    status: "Aktif",
  },
  {
    id: 5,
    nama: "Eko Pratama",
    nis: "005",
    kelas: "XI-B",
    jenisKelamin: "Laki-laki",
    status: "Tidak Aktif",
  },
  {
    id: 6,
    nama: "Fani Lestari",
    nis: "006",
    kelas: "X-A",
    jenisKelamin: "Perempuan",
    status: "Aktif",
  },
];
