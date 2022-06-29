import { Input as ADInput } from "antd";
import React, { useState } from "react";
import styled from 'styled-components'
const { TextArea } = ADInput;

interface FloatLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: 'input' | 'textarea';
  value?: string | ReadonlyArray<string> | number | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

interface LabelProps {
  floating: boolean;
}

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

const Label = styled.label<LabelProps>`
  top: ${(props)=>props.floating ? '6px' : '18px' };
  font-size: ${(props)=>props.floating ? '12px' : '16px' };
  color: #d9d9d9;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 12px;
  transition: 0.2s ease all;
`;

const Input = styled(ADInput)`
  font-size: 14px;
  font-weight: 600;
`

const FloatLabel: React.FC<FloatLabelProps> = props => {
  const [focus, setFocus] = useState<boolean>(false);
  const { label, type, value, onChange } = props;

  // const Component: typeof TextArea = type === 'textarea' ? TextArea : Input

  return (
    <Wrapper
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      { type == undefined || type === 'input' ? <Input className="floating-label" value={value} onChange={onChange}/> : null}
      { type === 'textarea' ? <TextArea className="floating-label" value={value} onChange={onChange}/> : null}
      <Label floating={focus || value !== undefined}>{label}</Label>
    </Wrapper>
  );
};

export default FloatLabel;
