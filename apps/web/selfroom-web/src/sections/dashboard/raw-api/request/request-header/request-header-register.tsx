import { Dialog, DialogTitle } from '@mui/material';
import RHRegisterContent from './rh-register-content';
import { Dispatch, SetStateAction } from 'react';
import { RequestFilter } from '../request';
import { useLocales } from '@/locales';

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

export const RequestHeaderRegister = ({
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
  const { t } = useLocales();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle>{t('Add HEADER')}</DialogTitle>
      <RHRegisterContent
        onClose={handleClose}
        {...contentProp}
        param={targetParam}
      />
    </Dialog>
  );
};
