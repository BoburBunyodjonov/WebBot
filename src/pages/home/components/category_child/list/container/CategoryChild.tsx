import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComp from "../../../../../../components/elements/table/Table";
import useCategoryContext from "../services/categoryChildContext";
import { Button, TableCell, TableRow } from "@mui/material";
import { FolderIcon } from "../../../../../../assets/svgs";
import Loading from "../../../../../../components/loading/Loading";
import useProductContext from "../../../products/services/productContext";
import { Image } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import ModalTop from "../../../../../../components/elements/modalTop/ModalTop";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import {
  add,
  increaseQuantity,
  increaseBox,
  decreaseBox,
  decreaseQuantity,
} from "../../../../../../store/cartSlice";
import { CartItem } from "../../../../../../common/types/cart";
import formatPriceWithSpaces from "../../../../../../hooks/formatPrice";

const CategorySecond = () => {
  const headers = ["Rasmi", "Nomi", "Soni"];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);
  const [quantity, setQuantity] = useState(0);
  const [box, setBox] = useState(0);

  const [productDrawerOpen, setProductDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const {
    state: { total, category, loading },
    actions: { setPage },
  } = useCategoryContext();

  const {
    state: { totalProduct, product },
    actions: { setPageProduct },
  } = useProductContext();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handlerClickFunc = (id: string, isCategory: boolean) => {
    const path = isCategory ? `/product?id=${id}` : `/category?id=${id}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadMoreData = () => {
    // Check if more category data is needed
    if (!loading && category.length < total) {
      setPage((prevPage) => prevPage + 1);
    }
    // Check if more product data is needed only if categories are empty
    else if (!loading && category.length === 0 && product.length < totalProduct) {
      setPageProduct((prevPage) => prevPage + 1);
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
        setBox(0);
      }
    }
  }, [cartItems, selectedProduct]);

  const handleAddToCart = () => {
    if (quantity > 0 && quantity) {
      dispatch(
        add({
          ...selectedProduct,
          quantity: quantity,
        })
      );
      setQuantity(0);
      setBox(0);
      handleProductDrawerToggle();
    }
  };

  //  Increase Quantity
  const handleIncreaseQuantity = () => {
    // dispatch(
    //   increaseQuantity({
    //     _id: selectedProduct._id,
    //     availableStock: selectedProduct.quantity,
    //   })
    // );
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Decrease Quantity
  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      dispatch(decreaseQuantity(selectedProduct._id));
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else if (quantity === 1) {
      dispatch(decreaseQuantity(selectedProduct._id));
    }
  };

  //  Increase Box
  const handleIncreaseBox = () => {
    dispatch(
      increaseBox({
        _id: selectedProduct._id,
        availableStock: selectedProduct.quantity,
      })
    );
    setQuantity((prevQuantity) => prevQuantity + selectedProduct.box_item);
    setBox((prevBox) => prevBox + 1);
  };

  // Decrease Box
  const handleDecreaseBox = () => {
    if (box > 0) {
      dispatch(decreaseBox(selectedProduct._id));
      setQuantity((prevQuantity) => prevQuantity - selectedProduct.box_item);
      setBox((prevBox) => prevBox - 1);
    } else if (quantity === 1) {
      dispatch(decreaseBox(selectedProduct._id));
    }
  };

  const handleProductDrawerToggle = () => {
    setProductDrawerOpen(() => {
      if (!productDrawerOpen === false) {
        setSelectedProduct(undefined)
      }
      return !productDrawerOpen
    });
  };

  const handleProductClick = (item: any) => {
    setQuantity(0);
    setSelectedProduct(item);
    handleProductDrawerToggle();
  };

  const renderBody = [
    ...category?.map((item, index) => (
      <TableRow
        className="cursor-pointer"
        onClick={() => handlerClickFunc(item._id, true)}
        key={`category-${index}`}
        sx={{
          backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
        }}
      >
        <TableCell className="border flex justify-center">
          <FolderIcon />
        </TableCell>
        <TableCell className="border">{item.name}</TableCell>
        <TableCell className="border">{item.item_count}</TableCell>
      </TableRow>
    )),
    ...product?.map((item, index) => (
      <TableRow
        className="cursor-pointer"
        onClick={() => handleProductClick(item)}
        key={`product-${index}`}
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
        <TableCell className="border" style={{ whiteSpace: "nowrap" }}>{formatPriceWithSpaces(item.price ?? 0)}</TableCell>
      </TableRow>
    )),
  ];


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
  }, [loading, category.length, total, product.length, totalProduct]);

  return (
    <div>
      <TableComp bodyChildren={renderBody} headers={headers} />
      {(category.length < total || (category.length === 0 && product.length < totalProduct)) && !loading && (
        <div ref={loadMoreRef} style={{ height: "20px", marginTop: "16px" }} />
      )}
      {loading && <Loading />}

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
                <>
                  <Button variant="contained" onClick={handleDecreaseBox} disabled={selectedProduct.box_item > selectedProduct.quantity}>
                    <RemoveIcon />
                  </Button>
                  <input
                    min="0"
                    pattern="[0-9]*"
                    max="35"
                    className="w-10 bg-[#F8F8F8] flex-grow text-center py-2 px-0 text-telegram-black bg-telegram-secondary-white outline-none"
                    type="text"
                    value={box}
                  />
                  <Button variant="contained" onClick={handleIncreaseBox} disabled={selectedProduct.box_item > selectedProduct.quantity}>
                    <AddIcon />
                  </Button>
                </>
              </div>
            </div>

            {/* Counter 2 */}
            <div className="flex justify-between items-center">
              <p className="font-bold">Soni</p>
              <div className="flex items-center justify-center space-x-4 py-4">
                <Button variant="contained" onClick={handleDecreaseQuantity}>
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
                <Button variant="contained" onClick={handleIncreaseQuantity} >
                  <AddIcon />
                </Button>
              </div>
            </div>
          </>
        )}
      </ModalTop>
    </div>
  );
};

export default CategorySecond;
