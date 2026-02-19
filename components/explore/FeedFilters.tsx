"use client";

import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

interface Props {
  sort: string;
  onSort: (sort: string) => void;
}

export default function FeedFilters({ sort, onSort }: Props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
      <Box>
        <Typography variant="overline" sx={{ color: "#8b5cf6", fontWeight: 700, letterSpacing: 3 }}>
          EXPLORE IDEAS
        </Typography>
        <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5 }}>
          Community Blueprints
        </Typography>
      </Box>

      <ToggleButtonGroup
        value={sort}
        exclusive
        onChange={(_, val) => val && onSort(val)}
        size="small"
        sx={{
          "& .MuiToggleButton-root": {
            borderColor: "rgba(139,92,246,0.2)",
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 600,
            px: 2,
            "&.Mui-selected": {
              background: "rgba(139,92,246,0.15)",
              color: "#8b5cf6",
              borderColor: "rgba(139,92,246,0.4)",
            },
            "&:hover": { background: "rgba(139,92,246,0.08)" },
          },
        }}
      >
        <ToggleButton value="recent">
          <AccessTimeIcon fontSize="small" sx={{ mr: 0.75 }} />
          Recent
        </ToggleButton>
        <ToggleButton value="votes">
          <WhatshotIcon fontSize="small" sx={{ mr: 0.75 }} />
          Top Voted
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
