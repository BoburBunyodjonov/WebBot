import { TableCell, TableRow, TextField } from "@mui/material";
import TableComp from "../../../../../components/elements/table/Table";
import useCategoryContext from "../services/productContext";
import { FolderIcon } from "../../../../../assets/svgs";
import ModalTop from "../../../../../components/elements/modalTop/ModalTop";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// Redux Toolkit

import { useDispatch, useSelector } from "react-redux";
import {
  add,
  increaseQuantity,
  decreaseQuantity,
} from "../../../../../store/cartSlice";
import { RootState } from "../../../../../store/store";
import { CartItem } from "../../../../../common/types/cart";

const Product = () => {
  // Reduc Toolkit
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);
  const [quantity, setQuantity] = useState(0);

  const headers = ["Image", "Name", "narxi"];
  const [productDrawerOpen, setProductDrawerOpen] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const {
    state: { total, product, loading = [] },
    actions: { setPage },
  } = useCategoryContext();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMoreData = () => {
    if (!loading && product.length < total) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (selectedProduct && selectedProduct._id) {
      const productInCart = cartItems.find(
        (item: CartItem) => item._id === selectedProduct._id.toString()
      );

      if (productInCart) {
        setQuantity(productInCart.quantity);
      } else {
        setQuantity(0);
      }
    } else {
      setQuantity(0);
    }
  }, [cartItems, selectedProduct]);

  const handleAddToCart = () => {
    dispatch(add(selectedProduct));
    setQuantity(1);
    handleProductDrawerToggle();
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(selectedProduct._id));
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(selectedProduct._id));
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else if (quantity === 1) {
      dispatch(decreaseQuantity(selectedProduct._id));
    }
  };

  const increment1 = () => setCount1(count1 + 1);
  const decrement1 = () => setCount1(count1 - 1);

  // const increment2 = () => {
  //   if (count2 < selectedProduct?.quantity) {
  //     setCount2(count2 + 1);
  //   }
  // };

  // const decrement2 = () => {
  //   if (count2 > 0) {
  //     setCount2(count2 - 1);
  //   }
  // };

  const handleProductDrawerToggle = () => {
    setProductDrawerOpen(!productDrawerOpen);
  };

  const handleProductClick = (item: any) => {
    setSelectedProduct(item);
    setCount1(0); // Reset counter 1
    setCount2(0); // Reset counter 2
    handleProductDrawerToggle();
  };

  const renderBody = product.map((item: any, index: any) => (
    <TableRow
      key={item.id}
      sx={{
        backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
      }}
    >
      <TableCell className="border flex justify-center">
        <FolderIcon />
      </TableCell>
      <TableCell onClick={() => handleProductClick(item)} className="border">
        {item.name}
      </TableCell>
      <TableCell className="border">{item.price}</TableCell>
    </TableRow>
  ));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreData();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loading, product.length, total]);

  return (
    <>
      <TableComp bodyChildren={renderBody} headers={headers} />

      {product.length < total && !loading && (
        <div ref={loadMoreRef} style={{ height: "20px", marginTop: "16px" }} />
      )}
      {loading && <h4>Loading...</h4>}

      <ModalTop
        open={productDrawerOpen}
        onClose={handleProductDrawerToggle}
        handleAddToCart={handleAddToCart}
      >
        {selectedProduct && (
          <>
            <div className="flex flex-col justify-center items-center">
              <p className="text-xl">{selectedProduct.name}</p>
              <p className="font-semibold">(soni {selectedProduct.quantity})</p>
            </div>

            {/* Counter 1 */}
            <div className="flex justify-between items-center">
              <p className="font-bold">Karobka</p>
              <div className="flex items-center justify-center space-x-4 py-4">
                <Button variant="contained" onClick={decrement1}>
                  <RemoveIcon />
                </Button>
                <input
                  min="0"
                  pattern="[0-9]*"
                  max="35"
                  className="w-10 bg-[#F8F8F8] flex-grow text-center py-2 px-0 text-telegram-black bg-telegram-secondary-white outline-none"
                  type="text"
                  value={count1}
                />
                <Button variant="contained" onClick={increment1}>
                  <AddIcon />
                </Button>
              </div>
            </div>

            {/* Counter 2 */}
            <div className="flex justify-between items-center">
              <p className="font-bold">Soni</p>
              <div className="flex items-center justify-center space-x-4 py-4">
                <Button variant="contained" onClick={handleDecrease}>
                  <RemoveIcon />
                </Button>
                <input
                  min="0"
                  pattern="[0-9]*"
                  max="35"
                  className="w-10 bg-[#F8F8F8] flex-grow text-center py-2 px-0 text-telegram-black bg-telegram-secondary-white outline-none"
                  type="text"
                  value={quantity}
                />
                <Button variant="contained" onClick={handleIncrease}>
                  <AddIcon />
                </Button>
              </div>
            </div>
          </>
        )}
      </ModalTop>
    </>
  );
};

export default Product;