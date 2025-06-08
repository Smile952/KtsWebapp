import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FormData {
  type: string;
  status: string;
}

export function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const [formData, setFormData] = React.useState < FormData > ({
    type: '',
    status: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let addr = '?';
    if (formData.type !== '') {
      addr += `type=${formData.type}`;
    }
    if (formData.status !== '') {
      if (formData.type !== '') {
        addr += '&';
      }
      addr += `status=${formData.status}`;
    }
    navigate(addr);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
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
                    boxShadow: 3,
                  }}
                >
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Typography>Select order type</Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="type"
                      onChange={handleChange}
                    >
                      <FormControlLabel value="1" control={<Radio />} label="Mobile" />
                      <FormControlLabel value="2" control={<Radio />} label="Web" />
                      <FormControlLabel value="3" control={<Radio />} label="DevOps" />
                    </RadioGroup>
                    <Divider
                      sx={{
                        borderColor: '#1976d2',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        my: 2,
                        opacity: 1,
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                    />
                    <Typography>Select order status</Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="status"
                      onChange={handleChange}
                    >
                      <FormControlLabel value="1" control={<Radio />} label="draft" />
                      <FormControlLabel value="2" control={<Radio />} label="deleted" />
                      <FormControlLabel value="3" control={<Radio />} label="created" />
                      <FormControlLabel value="4" control={<Radio />} label="completed" />
                      <FormControlLabel value="5" control={<Radio />} label="cancelled" />
                    </RadioGroup>
                    <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
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
