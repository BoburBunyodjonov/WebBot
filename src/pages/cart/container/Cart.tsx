import { Button, TableCell, TableRow } from "@mui/material";
import TableComp from "../../../components/elements/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { CartItem } from "../../../common/types/cart";
import { Delete, Image, Remove } from "@mui/icons-material";
import { clearCart, removeItem } from "../../../store/cartSlice";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useCartContext } from "../services/cartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { myCookie } from "../../../utils/myCookie";
import formatPriceWithSpaces from "../../../hooks/formatPrice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartitems = useSelector((state: RootState) => state.cart) as CartItem[];

  const totalQuantity = cartitems.reduce((acc, item) => acc + item.quantity, 0);

  const navigate = useNavigate();

  useEffect(() => {
    let access_token = myCookie.get("access_token");

    if (!access_token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
    toast.success("Mahsulot savatdan o'chirildi!");
  };

  const {
    formMethods: {
      handleSubmit,
      control,
      formState: { errors },
    },
    actions: { onFinish },
  } = useCartContext();

  const headers = ["Rasmi", "Nomi", "Soni", "Narxi", "Summa", ""];

  const renderBody = cartitems.map((item: any, index: any) => (
    <TableRow
      key={index}
      sx={{
        backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
      }}
    >
      <TableCell className="border flex justify-center">
        {item.image ? (
          <img
            className="w-[100px] h-[100px] object-contain rounded"
            src={`${process.env.REACT_APP_BASE_UPLOAD_URL}${item.image}`}
            alt=""
          />
        ) : (
          <div className="w-[100px] h-[100px] flex justify-center items-center bg-gray-200 rounded">
            <Image fontSize="large" className="text-gray-500" />
          </div>
        )}
      </TableCell>
      <TableCell className="border">{item.name}</TableCell>
      <TableCell className="border">{item.quantity}</TableCell>
      <TableCell className="border">
        {formatPriceWithSpaces(item.price)}
      </TableCell>
      <TableCell className="border">
        {formatPriceWithSpaces(item.price * item.quantity)}
      </TableCell>
      <TableCell className="border">
        <Delete
          className="text-red-500 cursor-pointer"
          onClick={() => handleRemoveItem(item._id)}
        />
      </TableCell>
    </TableRow>
  ));

  const handleSendItems = async () => {
    try {
      const payload = {
        products: cartitems.map((item) => ({
          product_id: item._id,
          amount: item.quantity,
        })),
      };
      await onFinish(payload);
      toast.success("Buyurtma yaratildi.");
      dispatch(clearCart());
    } catch (error) {
      console.error("Failed to send items:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between py-3 px-2">
        <p>Tovar: {totalQuantity} xil</p>
        <span
          className=" cursor-pointer"
          onClick={handleClearCart}
        >Savatni tozalash</span>
      </div>
      <TableComp bodyChildren={renderBody} headers={headers} />
      <div className="container absolute bottom-0 py-3 flex justify-center">
        <form
          onSubmit={handleSubmit(handleSendItems)}
          action=""
          className="w-[70%]"
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            disabled={totalQuantity === 0}
            className="space-x-2 flex items-center"
          >
            <span>Jo'natish</span>
            <LocalShippingIcon />
          </Button>
        </form>
      </div>
    </>
  );
};

export default Cart;
