import { Checkbox, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import FlaotingLabel from '../../components/flaoting-label';
import stepStyles from './styles/Step.module.css';

interface DeliveryProps {}

const Delivery: React.FC<DeliveryProps> = () => {
  return (
    <Layout className={stepStyles.content}>
      <Content className={stepStyles['main-content']}>
        <header className={stepStyles['main-content-header']}>
          <h2 className={stepStyles['step-header']}>Delivery details</h2>
          <Checkbox className='green-checkbox'>Send as dropshipper</Checkbox>
        </header>
        <div className={stepStyles['delivery-form']}>
          <div className={stepStyles['basic-information']}>
            <FlaotingLabel label={'Email'} value={'bray@email.com'} />
            <FlaotingLabel label={'Phone Number'} />
            <FlaotingLabel label={'Delivery Address'} type='textarea' />
          </div>
          <div className={stepStyles['dropshipper-information']}>
            <FlaotingLabel label={'Dropshipper name'} />
            <FlaotingLabel label={'Dropshipper Phone Number'} />
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default React.memo(Delivery);
