import React from "react";
import { Button, Drawer } from "@mui/material";

interface ModalTopProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  handleAddToCart?: any;
}

const ModalTop: React.FC<ModalTopProps> = ({
  open,
  onClose,
  children,
  handleAddToCart,
}) => {
  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: "auto",
          maxHeight: "500px",
          maxWidth: "500px",
          margin: "auto",
          padding: "12px",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        },
      }}
    >
      <div>{children}</div>

      <div className="flex flex-col space-y-2">
        <Button onClick={handleAddToCart} variant="contained">
          Savatga qo'shish
        </Button>
        <Button
          sx={{
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "darkred",
            },
          }}
          onClick={onClose}
          variant="contained"
          className="bg-red-500"
        >
          Chiqish
        </Button>
      </div>
    </Drawer>
  );
};

export default ModalTop;
