import { Typography } from 'antd';
import React from 'react'
import styled from 'styled-components';

interface SummaryItemProps {
    label: string;
    value: string | number;
    isBig?: boolean;
}

// // TODO: research why style not applied in first render
// const Item = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 12px;
// `

const { Text } = Typography;

const SummaryItem: React.FC<SummaryItemProps> = props => {
  const { label, value, isBig } = props
  return (
    <div className={isBig ? 'summary-item-wrapper-big' : 'summary-item-wrapper'}>
      <Text className={isBig ? 'summary-item-title-big' : ''} type={"secondary"}>{label}</Text>
      <Text className={isBig ? 'summary-item-value-big' : ''} strong>{value}</Text>
    </div>
  )
}

export default React.memo(SummaryItem);