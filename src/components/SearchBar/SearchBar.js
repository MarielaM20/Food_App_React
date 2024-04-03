import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { getFoods, deleteFood } from "../../Service/Api";
import { useNavigate, Link } from "react-router-dom";



function SearchBar({ placeholder, data }) {

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowClick = (row) => {
    setSelectedRows([...selectedRows, row]);
  };

  const clearRowById = (id) => {

    const updatedData = selectedRows.filter(row => row.id !== id);
    setSelectedRows(updatedData);
  };

  const [foods, setFoods] = useState(data);
  const [addFormData, setAddFormData] = useState({
    name: "",
    description: "",
    kcal: "",
    protein: "",
    fat: "",
    carbs: "",
  });

  const handleAddFormSubmit = (event) => {
    console.log("clicked");
  };

  const [addData, setAddData] = useState([]);
  useEffect(() => {
    getAllFoods();
  }, []);

  const getAllFoods = async () => {
    const response = await getFoods();
    console.log(response.data);
    setAddData(response.data);
  };

  const history = useNavigate();

  const deleteFoodData = async (id) => {
    await deleteFood(id);
    getAllFoods();
    history("/");
  };

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      console.log(value.name);
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div>
      <h2>Selected foods</h2>
      <Table className="table">
        <TableHead className="thead">
          <TableRow>
            <TableCell> Modify </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell> Kcal </TableCell>
            <TableCell> Protein </TableCell>
            <TableCell> Fat </TableCell>
            <TableCell> Carbs </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="tbody">
          {selectedRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Button onClick={() => clearRowById(row.id)} variant="contained" color="secondary"  >
                  Remove
                </Button>
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell> {parseFloat(row.kcal).toFixed(2)} </TableCell>
              <TableCell> {parseFloat(row.protein).toFixed(2)} </TableCell>
              <TableCell> {parseFloat(row.fat).toFixed(2)} </TableCell>
              <TableCell> {parseFloat(row.carbs).toFixed(2)} </TableCell>
            </TableRow>
          ))}
          <TableRow style={{ backgroundColor: 'white' }}>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>{selectedRows.reduce((acc, row) => acc + parseFloat(row.kcal), 0).toFixed(2)}</TableCell>
            <TableCell>{selectedRows.reduce((acc, row) => acc + parseFloat(row.protein), 0).toFixed(2)}</TableCell>
            <TableCell>{selectedRows.reduce((acc, row) => acc + parseFloat(row.fat), 0).toFixed(2)}</TableCell>
            <TableCell>{selectedRows.reduce((acc, row) => acc + parseFloat(row.carbs), 0).toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>


      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        {filteredData.length != 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 1).map((value, key) => {
              return (
                <Table className="table">
                  <TableHead className="thead">
                    <TableRow>
                      <TableCell> Name </TableCell>
                      <TableCell> Description </TableCell>
                      <TableCell> Kcal </TableCell>
                      <TableCell> Protein </TableCell>
                      <TableCell> Fat </TableCell>
                      <TableCell> Carbs </TableCell>
                      <TableCell> Modify</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="tbody">
                    {filteredData.map((row) => (
                      <TableRow key={row.id} onClick={() => handleRowClick(row)}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell> {parseFloat(row.kcal).toFixed(2)} </TableCell>
                        <TableCell> {parseFloat(row.protein).toFixed(2)} </TableCell>
                        <TableCell> {parseFloat(row.fat).toFixed(2)} </TableCell>
                        <TableCell> {parseFloat(row.carbs).toFixed(2)} </TableCell>
                        <TableCell>
                          <Button variant="contained" color="Primary" component={Link} style={{ marginRight: "15px" }} to={`/edit/${row.id}`} >
                            Edit
                          </Button>
                          <Button variant="contained" color="secondary" onClick={() => deleteFoodData(row.id)} >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              );
            })}
          </div>
        )
        }
      </div>

    </div>
  );
}

export default SearchBar;
