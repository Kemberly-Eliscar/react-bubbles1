import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors , setUpdated }) => {
  //console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
   
    axiosWithAuth()
    .put("/colors/" + colorToEdit.id, colorToEdit)
    .then(res => {
      const newColors = colors.map(item => {
        if (item.id === colorToEdit.if) {
          return (item = colorToEdit);
        } else {
          return item;
        }
      });
      updateColors(newColors);
      setEditing(false);
      setColorToEdit(initialColor);
    })
    .catch(err => console.log(err));
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete("/colors/" + color.id)
    .then(res => {
      console.log("Delete", colors, color.id);
      const newColors = colors.filter(item => {
        if (item.id !== color.id) {
          console.log("FOUND", item.id, color.id);
          return item;
        }
      });
      updateColors(newColors);
    })
    .catch(err => console.log(err));
  };
  const addItem = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors", colorToEdit)
      .then(res => {
        const newColors = [...colors, colorToEdit];
        updateColors(newColors);
        setColorToEdit(initialColor);
      })
      .catch(err => console.log(err));
  };

  const cancelEdit = () => {
    setEditing(false);
    setColorToEdit(initialColor);
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color}>
              <span className="delete" onClick={() => deleteColor(color)}>
                  x
              </span>
              <span onClick={() => editColor(color)}> {color.color}</span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>


      
      <form onSubmit={editing ? saveEdit : addItem}>
        <legend>{editing ? "edit color" : "Add Color"}</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
          {editing ? (
            <>
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
            </>
          ) : (
            <button type="submit">Add</button>
          )}
          </div>
        </form>
        </div>
      
  );
};

export default ColorList;
