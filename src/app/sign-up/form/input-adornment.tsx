import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockIcon from '@material-ui/icons/Lock';
import FaceIcon from '@material-ui/icons/Face';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';


export const emailIconAdornment = <InputAdornment position="end"><EmailIcon /></InputAdornment>;
export const passwordIconAdornment = <InputAdornment position="end"><LockOutlinedIcon /></InputAdornment>;
export const confirmPasswordIconAdornment = <InputAdornment position="end"><LockIcon /></InputAdornment>;
export const personIconAdornment = <InputAdornment position="end"><FaceIcon /></InputAdornment>;
export const jobTitleIconAdornment = <InputAdornment position="end"><WorkOutlineOutlinedIcon /></InputAdornment>;
export const locationIconAdornment = <InputAdornment position="end"><LocationOnOutlinedIcon /></InputAdornment>;
