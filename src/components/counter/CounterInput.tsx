import React, { useState } from 'react';
import { Card, CardContent, Button, TextField, Typography } from '@mui/material';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0)); // prevent negative count
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="shadow-2xl w-96 p-6">
        <CardContent>
          <div className="flex justify-around items-center mb-4">
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={decrement}
              className="w-12 h-12 text-xl rounded-full bg-red-400 hover:bg-red-500 text-white"
            >
              -
            </Button>
            <TextField
              value={count}
              variant="outlined"
              className="w-28 text-center bg-white shadow-lg rounded-md"
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={increment}
              className="w-12 h-12 text-xl rounded-full bg-green-400 hover:bg-green-500 text-white"
            >
              +
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Counter;
