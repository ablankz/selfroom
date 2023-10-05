import { SocialProvider } from '@/types/social-provider';
import { ButtonPropsColorOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

type Propvider = {
  value: SocialProvider;
  icon: string;
  iconColor?: string;
  iconWidth?: number;
  label: string;
  jaLabel: string;
  color?: OverridableStringUnion<
    | 'inherit'
    | 'success'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'warning',
    ButtonPropsColorOverrides
  >;
};

export const AUTH_PROVIDERS: Propvider[] = [
  {
    value: 'line',
    icon: 'bi:line',
    iconColor: '#06C755',
    iconWidth: 22,
    color: 'success',
    label: 'Login with LINE',
    jaLabel: 'LINEでログイン',
  },
  {
    value: 'google',
    icon: 'devicon:google',
    label: 'Login with Google',
    jaLabel: 'Googleでログイン',
  },
];
