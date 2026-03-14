import { useAppSelector } from "@/Redux/store";
import { Backdrop, CircularProgress } from "@mui/material";




export default function GlobalFullPageLoader() {
      const open = useAppSelector((state) => state.app.fullPageLoader);
    console.log("open❤️❤️ " , open)
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 999,
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}