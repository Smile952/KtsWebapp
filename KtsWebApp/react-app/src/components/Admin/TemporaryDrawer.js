import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [formData, setFormData] = useState({
    type:"",
    status:''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var addr = '?'
    if(formData['type'] !== null && formData['type'] !== ''){
      addr = addr+ `type=${formData['type']}`
    }
    if(formData['status'] !== null && formData['status'] !== ''){
      console.log(formData['status'])
      if(formData['type'] !== null && formData['type'] !== ''){
        addr = addr + '&'
      }
      addr = addr + `status=${formData['status']}`
    }
    console.log(addr)
    navigate(addr)
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation" >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <Box
                sx={{
                  maxWidth: 400,
                  mx: 'auto',
                  mt: 4,
                  p: 3,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              >
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                  <Typography>
                    Select order type
                  </Typography>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="type"
                    onChange={handleChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Female" />
                    <FormControlLabel value="2" control={<Radio />} label="Male" />
                    <FormControlLabel value="3" control={<Radio />} label="Other" />
                  </RadioGroup>
                  <Divider
                    sx={{ 
                      borderColor: '#1976d2', // Цвет линии (например, синий)
                      borderWidth: '2px', // Увеличенная толщина
                      borderStyle: 'solid', // Сплошная линия
                      my: 2, // Отступы сверху и снизу
                      opacity: 1, // Полная непрозрачность
                      // Дополнительно: можно добавить тень или градиент
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}/>
                  <Typography>
                    Select order status
                  </Typography>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="status"
                    onChange={handleChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Female" />
                    <FormControlLabel value="2" control={<Radio />} label="Male" />
                    <FormControlLabel value="3" control={<Radio />} label="Other" />
                  </RadioGroup>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                  >
                    Применить
                  </Button>
                </Box>
              </Box>
            </ListItemButton>
          </ListItem>

      </List>
      <Divider />
    </Box>
      </Drawer>
    </div>
  );
}
