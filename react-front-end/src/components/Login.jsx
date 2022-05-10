import * as React from 'react';
import Cookies from 'js-cookie'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import { user } from 'pg/lib/defaults';


export default function Login() {
    const handleSubmit = (e) => {
        console.log(e);
        Cookies.set('id', {e})
    };
    
    const [name, setName] = React.useState('');
    const handleChange = (event) => {
        setName(event.target.value);
    };

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
                value={name}
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
