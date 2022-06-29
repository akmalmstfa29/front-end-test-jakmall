import { Checkbox, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import FlaotingLabel from '../../components/flaoting-label';
import DeliveryContext, { DeliveryType } from '../../context/delivery-context';
import stepStyles from './styles/Step.module.css';

interface DeliveryProps {}

const Delivery: React.FC<DeliveryProps> = () => {
  const {delivery, setDelivery} = React.useContext(DeliveryContext);
  // const [delivery, setDelivery] = React.useState<DeliveryType>({
  //   email: '',
  //   phoneNumber: '',
  //   deliveryAddress: '',
  //   asDropshipper: false,
  // });

  return (
    <Layout className={stepStyles.content}>
      <Content className={stepStyles['main-content']}>
        <header className={stepStyles['main-content-header']}>
          <h2 className={stepStyles['step-header']}>Delivery details</h2>
          <Checkbox className='green-checkbox'>Send as dropshipper</Checkbox>
        </header>
        <div className={stepStyles['delivery-form']}>
          <div className={stepStyles['basic-information']}>
            <FlaotingLabel label={'Email'} value={delivery.email} autoFocus onChange={e => setDelivery({ ...delivery, email: e.target.value})} />
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
