import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Input from '@mui/material/Input';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const ariaLabel = { 'aria-label': 'description' };

export default function TransitionsModalTickets() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

return (
    <div>
    <Button onClick={handleOpen}><AddIcon>Carga Manual</AddIcon></Button>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
            timeout: 500,
            },
        }}
        >
        <Fade in={open}>
            <Box sx={style}>
            <div className=' mx-auto text-center flex flex-col justify-center'>
            <CloseIcon></CloseIcon>
            <Typography id="transition-modal-title" variant="h6" component="h2">
                Nombre del Proyecto:
            </Typography>
                <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                >
            <Input placeholder="Nombre" inputProps={ariaLabel} />
            <Typography id="transition-modal-title" variant="h6" component="h2" className='pl-7'>
                Descripción:
            </Typography>
            <Input placeholder="Descripción" inputProps={ariaLabel}/>
            <button className="bg-[#38bdf8] w-[230px] rounded-md font-medium my-6 mx:auto md:mx-0 py-3 text-black">Crear</button>
                </Box>
                
            </div>
            </Box>
            </Fade>
        </Modal>
    </div>
);
}