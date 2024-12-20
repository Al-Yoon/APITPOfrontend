import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import CloseIcon from '@mui/icons-material/Close';
import { createTicket } from '../../../api/tickets_api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ariaLabel = { 'aria-label': 'description' };

export default function ModalTickets({ addTicket, id, open, handleClose }) {
    const [formState, setFormState] = React.useState({
        ticketId: "",
        date: "",
        name: "",
        total: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormState({ ...formState, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTicket = {
            descripcion: formState.name,
            fecha: formState.date,
            monto: formState.total,
            projectId: id,
            image: formState.image
        };
        const response = createTicket(newTicket);
        addTicket(response);
        setFormState({ ticketId: "", date: "", name: "", total: "", image: null });
        handleClose();
        window.location.reload(); // Recargar la página después de cerrar el modal
    };

    return (
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
                        <CloseIcon onClick={handleClose} />
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Fecha:
                            </Typography>
                            <Input
                                name="date"
                                value={formState.date}
                                onChange={handleChange}
                                placeholder="Fecha"
                                inputProps={ariaLabel}
                                type='date'
                                required
                            />
                            <Typography id="transition-modal-title" variant="h6" component="h2" className='pl-7'>
                                Descripción
                            </Typography>
                            <Input
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                placeholder="Descripción"
                                inputProps={ariaLabel}
                                required
                            />
                            <Typography id="transition-modal-title" variant="h6" component="h2" className='pl-7'>
                                Monto Total
                            </Typography>
                            <Input
                                name="total"
                                value={formState.total}
                                onChange={handleChange}
                                placeholder="Cargar Monto"
                                inputProps={ariaLabel}
                                type="number"
                                required
                            />

                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Cargar Imagen:
                            </Typography>
                            <Input
                                type="file"
                                onChange={handleFileChange}
                                inputProps={ariaLabel}
                                required
                            />

                            <button type="submit" className="bg-[#38bdf8] hover:text-white w-[230px] rounded-md font-medium my-6 mx:auto md:mx-0 py-3 text-black">
                                Aceptar
                            </button>
                        </Box>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}