import React, {
  ChangeEvent, createRef, ReactNode, useState,
} from 'react';
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import { IStyledComponentProps } from '../Props';

import './edit-field.styles.sass';


interface EditFieldProps extends IStyledComponentProps, BaseTextFieldProps {
  onDone: (value: string) => void | Promise<void>;
  adornment?: ReactNode;
  defaultValue?: string
  validationRule?: (value: string) => boolean;
}

function EditField({
  onDone, defaultValue, className, adornment, label, placeholder, validationRule,
}: EditFieldProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue || '');

  let validByDefault: boolean = true;
  if (Boolean(defaultValue) && Boolean(validationRule)) {
    validByDefault = validationRule!(defaultValue!);
  }

  const [valid, setValid] = useState<boolean>(validByDefault);

  const inputRef = createRef<HTMLInputElement>();

  function switchToEdit() {
    setEditMode(true);
  }

  function undoEditing() {
    inputRef.current!.value = defaultValue || '';
    setValue(defaultValue || '');
    setEditMode(false);
  }

  function onValueChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    if (Boolean(validationRule)) {
      setValid(validationRule!(event.target.value));
    }
  }

  function onDoneInner() {
    setEditMode(false);
    onDone(value);
  }

  return (
    <div className={`edit-field-wrapper ${className || ''}`}>
      <TextField
        label={label}
        placeholder={placeholder}
        InputProps={{ startAdornment: adornment }}
        className="edit-field-text-field"
        onChange={onValueChange}
        inputRef={inputRef}
        defaultValue={defaultValue || ''}
      />
      {
        editMode
          ? (
            <>
              <IconButton disabled={!valid} onClick={() => onDoneInner()}><DoneIcon /></IconButton>
              <IconButton onClick={() => undoEditing()}><ClearIcon /></IconButton>
            </>
          )
          : (<IconButton onClick={() => switchToEdit()}><EditIcon /></IconButton>)
      }
    </div>
  );
}

export default EditField;
