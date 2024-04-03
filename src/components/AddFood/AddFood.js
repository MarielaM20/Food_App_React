import React, { useState } from 'react';
import { Input, Button, InputLabel } from '@material-ui/core';
import { addFood } from '../../Service/Api';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './AddFood.css';

const initialValues = {
  name: '',
  description: '',
  kcal: '',
  protein: '',
  fat: '',
  carbs: ''
};

const AddFood = () => {
  const [food, setFood] = useState(initialValues);
  const { name, description, kcal, protein, fat, carbs } = food;
  const history = useNavigate();

  const [error, setError] = useState('');

  const valueChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
    setError('');
  };

  const addFoodDetail = async () => {
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
      await addFood(food);
      history('/search');
    }
  };

  return (
    <Container>
      <section className="registration">
        <div className="container1">
          <h2 className="title2">Add Food</h2>
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

            <Button className="button" onClick={() => addFoodDetail()} variant="contained" color="primary">Add Food</Button>
          </form>
        </div>
      </section>
    </Container>
  );
};

export default AddFood;
