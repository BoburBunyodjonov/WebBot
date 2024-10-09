import { Button, TableCell, TableRow } from "@mui/material";
import TableComp from "../../../components/elements/table/Table";
import { FolderIcon } from "../../../assets/svgs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { CartItem } from "../../../common/types/cart";
import { Delete } from "@mui/icons-material";
import { clearCart } from "../../../store/cartSlice";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const Cart = () => {
  const dispatch = useDispatch();
  const cartitems = useSelector((state: RootState) => state.cart) as CartItem[];

  const totalQuantity = cartitems.reduce((acc, item) => acc + item.quantity, 0);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const headers = ["Image", "Name", "Soni", "Narxi", "Summa"];

  const renderBody = cartitems.map((item: any, index: any) => (
    <TableRow
      key={item.id}
      sx={{
        backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
      }}
    >
      <TableCell className="border flex justify-center">
        <FolderIcon />
      </TableCell>
      <TableCell className="border">{item.name}</TableCell>
      <TableCell className="border">{item.quantity}</TableCell>
      <TableCell className="border">{item.price}</TableCell>
      <TableCell className="border">{item.price}</TableCell>
    </TableRow>
  ));

  return (
    <>
      <div className="flex justify-between py-3 px-2">
        <p>Tovar: {totalQuantity} xil</p>
        <Delete className=" cursor-pointer" onClick={handleClearCart} />
      </div>
      <TableComp bodyChildren={renderBody} headers={headers} />
      <div className="container absolute bottom-0 py-3 flex justify-center">
        <Button variant="contained" className="space-x-2 w-[80%]">
          <span>Jo'natish</span>
          <LocalShippingIcon />
        </Button>
      </div>
    </>
  );
};

export default Cart;
