
import { Box, Card } from "@mui/material";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
}

export default function StatCard({
  title,
  value,
  description,
}: StatCardProps) {
  return (
    <Card className="stat-card">
      <Box className="stat-card-content">
        <Box>
          <p
            style={{
              fontSize: "14px",
              color: "#64748b",
              margin: 0,
            }}
          >
            {title}
          </p>

          <h2
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#1e293b",
              margin: "8px 0",
            }}
          >
            {value}
          </h2>

          <p
            style={{
              fontSize: "12px",
              color: "#64748b",
              margin: 0,
            }}
          >
            {description}
          </p>
        </Box>

        <Box className="stat-icon">
          {title.charAt(0)}
        </Box>
      </Box>
    </Card>
  );
}
