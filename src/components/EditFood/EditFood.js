import React, { useEffect, useState } from 'react';
import { InputLabel, Input, Button } from '@material-ui/core';
import { editFood, getFoods } from '../../Service/Api';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './EditFood.css';


const initialValues = {
  name: '',
  description: '',
  kcal: '',
  protein: '',
  fat: '',
  carbs: ''
};

const EditFood = () => {
  const [food, setFood] = useState(initialValues);
  const { name, description, kcal, protein, fat, carbs } = food;
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    loadFoodData();
  }, []);

  const loadFoodData = async () => {
    const response = await getFoods(id);
    setFood(response.data);
  };

  const [error, setError] = useState('');

  const valueChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
    setError('');
  };


  const editFoodDetail = async () => {
    if (name.trim() === '' || description.trim() === '' || kcal.trim() === '' || protein.trim() === '' || fat.trim() === '' || carbs.trim() === '') {
      setError('All fields are required');
    } else if (isNaN(kcal.trim())) {
      setError('Kcal must be a number');
    } else if (isNaN(protein.trim())) {
      setError('Protein must be a number');
    } else if (isNaN(fat.trim())) {
      setError('Fat must be a number');
    } else if (isNaN(carbs.trim())) {
      setError('Carbs must be a number');
    } else {
      await editFood(id, food);
      history('/search');
    }
  };

  return (
    <Container>
      <section className="registration">
        <div className="container1">
          <h2 className="title2">Edit Food</h2>
          <form>
            <div className="user-details">
              <div className="input-box">
                <InputLabel for="name" className="details">Name</InputLabel>
                <Input onChange={(e) => valueChange(e)} name="name" value={name} />
              </div>
              <div className="input-box">
                <InputLabel for="description" className="details">Description</InputLabel>
                <Input onChange={(e) => valueChange(e)} name="description" value={description} />
              </div>
              <div className="input-box">
                <InputLabel for="kcal" className="details">Kcal</InputLabel>
                <Input onChange={(e) => valueChange(e)} name="kcal" value={kcal} />
              </div>
              <div className="input-box">
                <InputLabel for="protein" className="details">Protein</InputLabel>
                <Input onChange={(e) => valueChange(e)} name="protein" value={protein} />
              </div>
              <div className="input-box">
                <InputLabel for="fat" className="details">Fat</InputLabel>
                <Input onChange={(e) => valueChange(e)} name="fat" value={fat} />
              </div>
              <div className="input-box">
                <InputLabel for="carbs" className="details">Carbs</InputLabel>
                <Input onChange={(e) => valueChange(e)} name="carbs" value={carbs} />
              </div>
            </div>
            {error && <h4 style={{ color: 'red', margin: '2% 37%' }}>{error}</h4>}

            <Button className="button" onClick={() => editFoodDetail()} variant="contained" color="primary">Update Food</Button>
          </form>
        </div>
      </section>
    </Container>

    // <Box>
    //   <FormGroup className={classname.container}>
    //     <Typography variant="h3"> Update Food </Typography>
    //     <FormControl>
    //         <InputLabel> Name </InputLabel>
    //         <Input onChange={(e) => valueChange(e)} name="name" value={name} />
    //     </FormControl>
    //     <FormControl>
    //         <InputLabel> Description </InputLabel>
    //         <Input onChange={(e) => valueChange(e)} name="description" value={description} />
    //     </FormControl>
    //     <FormControl>
    //         <InputLabel> Kcal </InputLabel>
    //         <Input onChange={(e) => valueChange(e)} name="kcal" value={kcal} />
    //     </FormControl>
    //     <FormControl>
    //         <InputLabel> Protein </InputLabel>
    //         <Input onChange={(e) => valueChange(e)} name="protein" value={protein} />
    //     </FormControl>
    //     <FormControl>
    //         <InputLabel> Fat </InputLabel>
    //         <Input onChange={(e) => valueChange(e)} name="fat" value={fat} />
    //     </FormControl>
    //     <FormControl>
    //         <InputLabel> Carbs </InputLabel>
    //         <Input onChange={(e) => valueChange(e)} name="carbs" value={carbs} />
    //     </FormControl>
    //     <Button variant="contained" color="primary" onClick={() => editFoodDetail()} >
    //       Update Food
    //     </Button>
    //   </FormGroup>
    // </Box>
  );
};

export default EditFood;
