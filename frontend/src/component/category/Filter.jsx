import React from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/material";

const Filter = ({ category, onSelectCategory }) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleCategoryChange = (categoryId) => {
    onSelectCategory(categoryId);
  };

  const checkboxes = category.map((data) => (
    <FormControlLabel
      key={data.id}
      control={<Checkbox icon={icon} checkedIcon={checkedIcon} />}
      label={data.nombre}
      onChange={() => handleCategoryChange(data.id)}
    />
  ));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {checkboxes}
    </Box>
  );
};

export default Filter;
