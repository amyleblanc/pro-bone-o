import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const axios = require("axios").default;


export default function Login() {
    const [id, setID] = React.useState('');
    const handleChange = (event) => {
        setID(event.target.value);
    };
    const handleSubmit = (event)=> {
        event.preventDefault()
        axios.get(`/login/${id}`);
    }

    return (
        <>
         <form onSubmit={handleSubmit} >
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
             <TextField
                id="outlined-name"
                label="UserID"
                value={id}
                onChange={handleChange}
            />
            </Box>
        <button type="submit" style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
          Submit
        </button>
            </form>
        </>
    );
}
