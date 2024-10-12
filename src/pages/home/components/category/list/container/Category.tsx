import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TableComp from "../../../../../../components/elements/table/Table";
import useCategoryContext from "../services/categoryContext";
import { TableCell, TableRow } from "@mui/material";
import { FolderIcon } from "../../../../../../assets/svgs";
import Loading from "../../../../../../components/loading/Loading";

const Category = () => {
  const headers = ["Rasmi", "Nomi", "Soni"];
  const navigate = useNavigate();

  const {
    state: { total, category, loading },
    actions: { setPage },
  } = useCategoryContext();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handlerClickFunc = (id: string) => {
    navigate(`/product?id=${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadMoreData = () => {
    if (!loading && category.length < total) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderBody = category.map((item, index) => (
    <TableRow
      className="cursor-pointer"
      onClick={() => handlerClickFunc(item._id)}
      key={index}
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
  }, [loading, category.length, total]);

  return (
    <div>
      <TableComp bodyChildren={renderBody} headers={headers} />
      {category.length < total && !loading && (
        <div ref={loadMoreRef} style={{ height: "20px", marginTop: "16px" }} />
      )}
      {loading && <Loading/>}
    </div>
  );
};

export default Category;
