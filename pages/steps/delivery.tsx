import { Button, Checkbox, Layout, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { Dispatch, SetStateAction } from 'react';
import FlaotingLabel from '../../components/flaoting-label';
import DeliveryContext, { DeliveryType } from '../../context/delivery-context';
import stepStyles from './styles/Step.module.css';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import SummaryItem from '../../components/summary-item';
const { Text } = Typography;

interface DeliveryProps {
  changeStep?: React.Dispatch<React.SetStateAction<number>>
}

const phoneRegExp = /^[+()\d-]+$/

const schema = yup.object({
  email: yup.string().email().label('Email').required(),
  phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').min(6).max(20).label('Phone Number').required(),
  deliveryAddress: yup.string().label('Delivery Address').required(),
  asDropshipper: yup.bool(),
  dropshipperName: yup.string().label('Dropshipper Name').ensure().when('asDropshipper', {
    is: true,
    then: yup.string().required()
  }),
  dropshipperPhoneNumber: yup.string().label('Dropshipper Phone Number').ensure().when('asDropshipper', {
    is: true,
    then:  yup.string().matches(phoneRegExp, 'Dropshipper Phone Number is not valid').min(6).max(20).required(),
  }),
}).required();

const Delivery: React.FC<DeliveryProps> = ({changeStep}) => {
  const { delivery, setDelivery } = React.useContext(DeliveryContext);
  const { control, watch, handleSubmit, formState: { errors }, setValue, setError } = useForm<DeliveryType>({
    resolver: yupResolver(schema)
  });
  const asDropshipper = watch('asDropshipper', false)

  const [dropshippingFee, setDropshippingFee] = React.useState<number>(delivery.dropshippingFee || 0)

  const onSubmit: SubmitHandler<DeliveryType> = data => {
    changeStep && changeStep(1)
    setTimeout(() => {
      setDelivery({...data, dropshippingFee})
    }, 350)
  };

  React.useEffect(() => {
    setValue('dropshipperName', '')
    setValue('dropshipperPhoneNumber', '')
    setError('dropshipperName', {})
    setError('dropshipperPhoneNumber', {})
    setDropshippingFee(asDropshipper ? 5900 : 0);
  }, [asDropshipper]);

  return (
    <>
      <Layout className={stepStyles.content}>
        <Content className={stepStyles['main-content']}>
          <header className={stepStyles['main-content-header']}>
            <h2 className={stepStyles['step-header']}>Delivery details</h2>
            <Controller
              name={'asDropshipper'}
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Checkbox className='green-checkbox' {...field}>Send as dropshipper</Checkbox>}
            />
          </header>
          <div className={stepStyles['delivery-form']}>
            <div className={stepStyles['basic-information']}>
              <Controller
                name={'email'}
                control={control}
                rules={{ required: true }}
                render={({ field }) => <FlaotingLabel label={'Email'} field={field} error={errors.email} />}
              />
              <Controller
                name={'phoneNumber'}
                control={control}
                rules={{ required: true }}
                render={({ field }) => <FlaotingLabel label={'Phone Number'} field={field} error={errors.phoneNumber} />}
              />
              <Controller
                name={'deliveryAddress'}
                control={control}
                rules={{ required: true }}
                render={({ field }) => <FlaotingLabel label={'Delivery Address'} type={'textarea'} field={field} error={errors.deliveryAddress} />}
              />
            </div>
            <div className={stepStyles['dropshipper-information']}>
              <Controller
                name={'dropshipperName'}
                control={control}
                rules={{ required: true }}
                render={({ field }) => <FlaotingLabel label={'Dropshipper Name'} field={field} error={errors.dropshipperName} disabled={!asDropshipper} />}
              />
              <Controller
                name={'dropshipperPhoneNumber'}
                control={control}
                rules={{ required: true }}
                render={({ field }) => <FlaotingLabel label={'Dropshipper Phone Number'} field={field} error={errors.dropshipperPhoneNumber} disabled={!asDropshipper} />}
              />
            </div>
          </div>
        </Content>
      </Layout>
      <Layout className={stepStyles['summary-wrapper']}>
        <h2 className={stepStyles['summary-header']}>Summary</h2>
        <Text type="secondary">10 items purchased</Text>
        <div className='flex-space' />
        <SummaryItem label='Cost of goods' value={'500,000'} />
        {dropshippingFee ? (<SummaryItem label='Dropshipping Fee' value={dropshippingFee.toLocaleString('en-US')} />) : null}
        <SummaryItem isBig={true} label='Total' value={'505,900'} />
        <Button onClick={handleSubmit(onSubmit)} className={stepStyles['submit-button']} type="primary">Continue to Payment</Button>
      </Layout>
    </>
  )
}

// export default React.memo(React.forwardRef(Delivery));
export default Delivery;
