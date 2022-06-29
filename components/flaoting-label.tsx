import { CheckOutlined } from "@ant-design/icons";
import { Input as ADInput } from "antd";
import React, { useState } from "react";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import styled from 'styled-components';
const { TextArea: ADTextArea } = ADInput;

interface FloatLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: 'input' | 'textarea';
  value?: string | ReadonlyArray<string> | number | undefined;
  field?: ControllerRenderProps<any, any>;
  error?: FieldError;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

interface LabelProps {
  floating: boolean;
  isValid: boolean;
  isError: boolean;
}

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

const Label = styled.label<LabelProps>`
  top: ${({floating}) => floating ? '6px' : '18px' };
  font-size: ${({floating}) => floating ? '12px' : '16px' };
  color: ${({floating, isError, isValid}) => isError && floating ? '#FF8A00' : isValid && floating ? '#1BD97B' : '#d9d9d9' };
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 12px;
  transition: 0.2s ease all;
`;

interface InputProps {
  isError: boolean;
  isValid: boolean;
}

const Input = styled(ADInput)<InputProps>`
  font-size: 14px;
  font-weight: 600;
  border-color: ${({isError, isValid}) => isError ? '#FF8A00' : isValid ? '#1BD97B' : 'none' };
  &:focus {
    border-color: ${({isError, isValid}) => isError ? '#FF8A00' : isValid ? '#1BD97B' : 'none' };
    box-shadow: 0 0 0 2px ${({isError, isValid}) => isError ? 'rgba(255, 138 , 0, 0.2)' : isValid ? 'rgba(27, 217, 123, 0.2)' : 'none' };
  }
  &:hover {
    border-color: ${({isError, isValid}) => isError ? '#FF8A00' : isValid ? '#1BD97B' : 'none' };
  }
`

const TextArea = styled(ADTextArea)<InputProps>`
  font-size: 14px;
  font-weight: 600;
  border-color: ${({isError, isValid}) => isError ? '#FF8A00' : isValid ? '#1BD97B' : 'none' };
  &:focus {
    border-color: ${({isError, isValid}) => isError ? '#FF8A00' : isValid ? '#1BD97B' : 'none' };
    box-shadow: 0 0 0 2px ${({isError, isValid}) => isError ? 'rgba(255, 138 , 0, 0.2)' : isValid ? 'rgba(27, 217, 123, 0.2)' : 'none' };
  }
  &:hover {
    border-color: ${({isError, isValid}) => isError ? '#FF8A00' : isValid ? '#1BD97B' : 'none' };
  }
`

const Error = styled.p`
  margin-top: 5px;
  color: #FF8A00;
`

const FloatLabel: React.FC<FloatLabelProps> = props => {
  const [focus, setFocus] = useState<boolean>(false);
  const { disabled, error, field, label, type, value, onChange } = props;
  const val = value || field?.value;

  return (
    <Wrapper
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      { type == undefined || type === 'input'
        ? <Input
            className="floating-label"
            value={value || field?.value}
            onChange={onChange || field?.onChange}
            {...field}
            disabled={disabled}
            isValid={!error && !!val}
            isError={!!error}
          />
        : null }
      { type === 'textarea'
        ? <TextArea
            className="floating-label"
            value={value || field?.value}
            onChange={onChange || field?.onChange}
            {...field}
            disabled={disabled}
            isValid={!error && !!val}
            isError={!!error}
          />
        : null }
      <Label floating={focus || !!val} isError={!!error} isValid={!error && !!val}>{label}</Label>
      {error && <Error>{error.message}</Error>}
    </Wrapper>
  );
};

export default FloatLabel;
