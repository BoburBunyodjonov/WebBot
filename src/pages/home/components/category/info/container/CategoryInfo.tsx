import TableComp from "../../../../../../components/elements/table/Table";
import useCategoryInfoContext from "../services/categoryInfoContext";

const CategoryInfo = () => {
  const headers = ["Image", "Name", "narxi"];

  const {
    state: { category, otherCategory },
  } = useCategoryInfoContext();

  console.log(otherCategory)

  return (
    <>
      <TableComp category={category} headers={headers} />
    </>
  );
};

export default CategoryInfo;
