import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../AuthContextPrueba';
import { updateUser } from '../../../api/profile_api';
import { Link } from "react-router-dom";

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
  zIndex: 1000,  // Ajusta el z-index del modal
};

const ariaLabel = { 'aria-label': 'description' };

export default function ModalUser({ userData, onUpdateUser, open, handleClose }) {
  const { user } = React.useContext(AuthContext);
  const [tempUserData, setTempUserData] = React.useState({
    nombre: userData.nombre || '',
    email: userData.email || '',
    contrasenia: '',
  });
  const [error, setError] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSave = async () => {
    const { nombre, email, contrasenia } = tempUserData;

    // Validaciones básicas
    if (!nombre || !email || !contrasenia) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (!validarEmail(email)) {
      setError('Por favor, ingrese un email válido.');
      return;
    }

    try {
      // Datos para enviar al API
      const updatedUserData = { nombre, email, contrasenia };
      const updatedProfile = await updateUser(user.id, updatedUserData);

      if (updatedProfile) {
        onUpdateUser(updatedProfile); // Notificar al componente padre
        handleClose();
      } else {
        setError('Error al actualizar el perfil. Intente nuevamente.');
      }
    } catch (error) {
      console.error('Error en handleSave:', error);
      setError('Ocurrió un error al actualizar. Verifique su conexión.');
    }
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
        backdrop: { timeout: 500 },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <button onClick={handleClose} style={{ float: 'right', background: 'none', border: 'none' }}>
            <CloseIcon />
          </button>
          <div className="mx-auto text-center flex flex-col justify-center">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Editar Usuario
            </Typography>
            <Box
              component="form"
              sx={{ '& > :not(style)': { m: 1 } }}
              noValidate
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                Nombre
              </Typography>
              <Input
                name="nombre"
                placeholder="Nombre"
                inputProps={ariaLabel}
                value={tempUserData.nombre}
                onChange={handleChange}
              />

              <Typography variant="subtitle1" sx={{ textAlign: 'center', mt: 2 }}>
                Email
              </Typography>
              <Input
                name="email"
                placeholder="Email"
                inputProps={ariaLabel}
                type="email"
                value={tempUserData.email}
                onChange={handleChange}
              />

              <Typography variant="subtitle1" sx={{ textAlign: 'center', mt: 2 }}>
                Nueva Contraseña
              </Typography>
              <Input
                name="contrasenia"
                placeholder="Nueva Contraseña"
                inputProps={ariaLabel}
                type="password"
                value={tempUserData.contrasenia}
                onChange={handleChange}
              />

              {error && (
                <Typography variant="caption" color="error">
                  {error}
                </Typography>
              )}

              <div className="flex flex-row items-center justify-center text-white">
                <Link to="/login">
                  <Button onClick={handleSave} type="submit" variant="contained" sx={{ mt: 3, bgcolor: '#38bdf8', color: '#000', width: '100%' }} fullWidth>
                    Guardar Cambios
                  </Button>
                </Link>
              </div>
            </Box>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}