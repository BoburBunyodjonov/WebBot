import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableComp from "../../../../../../components/elements/table/Table";
import useCategoryContext from "../services/categoryChildContext";
import { Button, TableCell, TableRow } from "@mui/material";
import { FolderIcon } from "../../../../../../assets/svgs";
import Loading from "../../../../../../components/loading/Loading";
import useProductContext from "../../../products/services/productContext";
import { Image } from "@mui/icons-material";
import ModalTop from "../../../../../../components/elements/modalTop/ModalTop";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import {
  add,
  increaseQuantity,
  increaseBox,
  decreaseBox,
  decreaseQuantity,
} from "../../../../../../store/cartSlice";
import { CartItem } from "../../../../../../common/types/cart";
import formatPriceWithSpaces from "../../../../../../hooks/formatPrice";
import useQueryParams from "../../../../../../hooks/useQueryParams";

const CategoryChild = () => {
  const headers = ["Rasmi", "Nomi", "Soni"];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const cartItems = useSelector((state: RootState) => state.cart);

  const [quantity, setQuantity] = useState(0);
  const [box, setBox] = useState(0);
  const [productDrawerOpen, setProductDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { getParam, setParam } = useQueryParams();
  const initialPage = getParam("page") ? Number(getParam("page")) : 1;
  const [page, setPageState] = useState<number>(initialPage);

  const query = new URLSearchParams(search);
  const parentId = query.get('parent_id');
  const id = query.get('id');

  const {
    state: { total, category, loading },
    actions: { setPage, getPaging },
  } = useCategoryContext();

  const {
    state: { totalProduct, product, loading: productLoading },
    actions: { setPageProduct, getPaging: getProductPaging },
  } = useProductContext();

  const loadData = async () => {
    if (parentId && id) {
      await getPaging(page, "", false);
      await getProductPaging(1, "", false);
    }
  };

  useEffect(() => {
    loadData();
  }, [parentId, id]);

  const handleCategoryClick = async (categoryId: string) => {
    navigate(`/category_child?parent_id=${categoryId}&id=${categoryId}`);
    // await loadData();
  };

  const handleProductClick = (product: any) => {
    setQuantity(0);
    setBox(0);
    setSelectedProduct(product);
    setProductDrawerOpen(true);
  };

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMoreData = () => {
    if (!loading && category.length < total) {
      setPage((prevPage) => prevPage + 1);
    } else if (!productLoading && product.length < totalProduct) {
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



  ////////////////////////////////////////////////////////////////////////

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

  const renderTableRows = () => [
    ...category.map((item, index) => (
      <TableRow
        key={`category-${item._id}`}
        onClick={() => handleCategoryClick(item._id)}
        className="cursor-pointer"
        sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0" }}
      >
        <TableCell className="border flex justify-center">
          <FolderIcon />
        </TableCell>
        <TableCell className="border">{item.name}</TableCell>
        <TableCell className="border">{item.child_count + item.item_count}</TableCell>
      </TableRow>
    )),
    ...product.map((item, index) => (
      <TableRow
        key={`product-${item._id}`}
        onClick={() => handleProductClick(item)}
        className="cursor-pointer"
        sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0" }}
      >
        <TableCell className="border flex justify-center">
          {item.image ? (
            <img
              className="w-[100px] h-[100px] object-contain rounded"
              src={`${process.env.REACT_APP_BASE_UPLOAD_URL}${item.image}`}
              alt={item.name}
            />
          ) : (
            <div className="w-[100px] h-[100px] flex justify-center items-center bg-gray-200 rounded">
              <Image fontSize="large" className="text-gray-500" />
            </div>
          )}
        </TableCell>
        <TableCell className="border">{item.name}</TableCell>
        <TableCell className="border" style={{ whiteSpace: "nowrap" }}>
          {formatPriceWithSpaces(item.price ?? 0)}
        </TableCell>
      </TableRow>
    ))
  ];

  return (
    <div>
      <TableComp bodyChildren={renderTableRows()} headers={headers} />

      {(category.length < total || (category.length === 0 && product.length < totalProduct)) && !loading && (
        <div ref={loadMoreRef} style={{ height: "20px", marginTop: "16px" }} />
      )}

      {(loading || productLoading) && <Loading />}

      {!loading && category.length === 0 && product.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Kategoriyalar yoki mahsulotlar topilmadi.</p>
      )}

      <ModalTop
        open={productDrawerOpen}
        onClose={() => setProductDrawerOpen(false)}
        handleAddToCart={handleAddToCart}
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
              <p className="text-gray-600">Mavjud: {selectedProduct.quantity}</p>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold">Karobka</span>
              <div className="flex items-center gap-4">
                <Button variant="contained" onClick={handleDecreaseBox} disabled={selectedProduct.box_item > selectedProduct.quantity}>
                  <RemoveIcon />
                </Button>
                <span className="w-10 text-center">{box}</span>
                <Button variant="contained" onClick={handleIncreaseBox} disabled={selectedProduct.box_item > selectedProduct.quantity}>
                  <AddIcon />
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold">Soni</span>
              <div className="flex items-center gap-4">
                <Button
                  variant="contained"
                  onClick={handleDecreaseQuantity}
                >
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
                <Button
                  variant="contained"
                  onClick={handleIncreaseQuantity}
                >
                  <AddIcon />
                </Button>
              </div>
            </div>
          </div>
        )}
      </ModalTop>
    </div>
  );
};

export default CategoryChild;