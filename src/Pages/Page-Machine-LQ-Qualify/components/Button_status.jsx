import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import Card from "@mui/material/Card";

export default function StatusButtons({ data, click, css }) {
  return (
    <Stack direction="row" spacing={2}>
      {data.map((item, index) => (
        <Button
          key={index}
          variant="contained"
          onClick={() => click(item.title)}
          sx={{
            borderRadius: "18px",
            color: "#FFFFFF",
            // backgroundColor: "#45B39D",
            backgroundColor: css === item.title ? "#2E86C1 " : "#45B39D", // เปลี่ยนสีพื้นหลังถ้า css เท่ากับ item.title
            textTransform: "none",
            "&:hover": {
              backgroundColor: css === item.title ? "#2E86C1 " : "#45B39D", // เปลี่ยนสีพื้นหลังถ้า css เท่ากับ item.title
            },
          }}
        >
          <AutoGraphIcon
            sx={{
              mr: 1,
            }}
          />
          {item.title}
          <Card
            sx={{
              ml: 1,
              width: 60,
              height: 25,
              borderRadius: "11px",
              fontWeight: "bold",
            }}
          >
            {item.result}
          </Card>
        </Button>
      ))}
    </Stack>
  );
}

// color: "#FFFFFF",
// backgroundColor: "#3498db",
