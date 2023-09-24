import { Dialog, DialogTitle } from '@mui/material';
import RBRegisterContent from './rb-register-content';
import { Dispatch, SetStateAction } from 'react';
import { RequestFilter } from '../request';

type Param = {
  key: string;
  value: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  setFilters: Dispatch<SetStateAction<RequestFilter>>;
  filters: RequestFilter;
  targetParam: Param | undefined;
  setTargetParam: Dispatch<SetStateAction<Param | undefined>>;
};

export const RequestBodyRegister = ({
  open,
  onClose,
  targetParam,
  setTargetParam,
  ...contentProp
}: Props) => {
  const handleClose = () => {
    setTargetParam(undefined);
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle>クエリパラム追加</DialogTitle>
      <RBRegisterContent
        onClose={handleClose}
        {...contentProp}
        param={targetParam}
      />
    </Dialog>
  );
};
