
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Tooltip,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import type { Student } from "../data/students";

interface StudentTableProps {
  data: Student[];
  onEdit?: (student: Student) => void;
  onDelete?: (id: number) => void;
}

export default function StudentTable({
  data,
  onEdit,
  onDelete,
}: StudentTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const showActions = Boolean(onEdit && onDelete);

  useEffect(() => {
    const maxPage = Math.max(
      0,
      Math.ceil(data.length / rowsPerPage) - 1
    );

    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [data.length, page, rowsPerPage]);

  const displayedStudents = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (
    _event: unknown,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box className="table-section">
      <Box sx={{ mb: 3 }}>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#1E293B",
            margin: "0 0 6px 0",
          }}
        >
          Data Siswa
        </h3>

        <p
          style={{
            color: "#64748B",
            fontSize: "13px",
            margin: 0,
          }}
        >
          Daftar informasi seluruh siswa
        </p>
      </Box>

      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: showActions ? 850 : 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama Siswa</TableCell>
              <TableCell>NIS</TableCell>
              <TableCell>Kelas</TableCell>
              <TableCell>Jenis Kelamin</TableCell>
              <TableCell>Status</TableCell>

              {showActions && (
                <TableCell align="center">Aksi</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedStudents.length > 0 ? (
              displayedStudents.map((student, index) => (
                <TableRow key={student.id} hover>
                  <TableCell>
                    {page * rowsPerPage + index + 1}
                  </TableCell>

                  <TableCell>
                    <strong style={{ fontSize: "14px" }}>
                      {student.nama}
                    </strong>
                  </TableCell>

                  <TableCell>{student.nis}</TableCell>
                  <TableCell>{student.kelas}</TableCell>
                  <TableCell>{student.jenisKelamin}</TableCell>

                  <TableCell>
                    <Chip
                      label={student.status}
                      color={
                        student.status === "Aktif"
                          ? "success"
                          : "default"
                      }
                      size="small"
                      sx={{
                        fontWeight: 600,
                        borderRadius: "7px",
                      }}
                    />
                  </TableCell>

                  {showActions && (
                    <TableCell align="center">
                      <Tooltip title="Edit siswa">
                        <IconButton
                          size="small"
                          onClick={() => onEdit?.(student)}
                          sx={{
                            color: "#2563EB",
                            mr: 0.5,
                          }}
                        >
                          <EditRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Hapus siswa">
                        <IconButton
                          size="small"
                          onClick={() => onDelete?.(student.id)}
                          sx={{ color: "#DC2626" }}
                        >
                          <DeleteRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={showActions ? 7 : 6}
                  align="center"
                  sx={{
                    py: 5,
                    color: "text.secondary",
                  }}
                >
                  Data siswa tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Baris per halaman:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} dari ${count}`
        }
        sx={{
          borderTop: "1px solid #E2E8F0",
          color: "#64748B",
          ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
            fontSize: "13px",
          },
        }}
      />
    </Box>
  );
}
