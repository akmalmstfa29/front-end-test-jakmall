import {
  ArrowLeftOutlined
} from '@ant-design/icons'
import { Button, Layout, StepProps, Steps, Typography } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import SummaryItem from '../components/summary-item'
import styles from '../styles/Home.module.css'
import Delivery from './steps/delivery'

const { Text } = Typography;

const { Step } = Steps;

type Step = {
  title: string;
  status: StepProps['status'];
  submitText?: string;
}

// // TODO: research why style not applied in first render
// const ContentWrapper = styled(Layout)`
//   flex: 1 1 auto;
//   flex-direction: row;
//   background: unset;
// `;

// const SummaryWrapper = styled(Layout)`
//   background: unset;
//   width: 27%;
//   padding-left: 20px;
//   border-left: 0.5px solid #FF8A00;
// `;

// const SummaryHeader = styled.h2`
//   font-family: 'Montserrat';
//   font-weight: 700;
//   font-size: 24px;
//   color: #FF8A00;
//   margin: 0;
//   padding: 10px 0px;
// `;

const Home: NextPage = () => {
  const [currentStep] = React.useState(0);
  const [steps, changeStep] = React.useState<Array<Step>>([
    { title: 'Delivery', submitText: 'Continue to Payment', status: 'wait' },
    { title: 'Payment', submitText: 'Pay', status: 'wait' },
    { title: 'Finish', status: 'wait' },
  ]);
  
  const RenderStep = () => {
    switch (currentStep) {
      case 0:
        return <Delivery />;
      case 1:
        return <Delivery />;
      case 2:
        return <Delivery />;
      default:
        return <Delivery />;
    }
  }
  
  React.useEffect(() => {
    adjustStatus()
  }, []);

  return (
    <Layout className={styles.wrapper}>
      <Head>
        <title>Jakmall | Payment</title>
        <meta name="description" content="Jakmall Front End Technical Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content className={styles['content-layout']}>
        <div className={styles['main-content']}>
          <div className={styles['content-navigation']}>
            <Steps className={'payment-steps'} type='navigation' current={currentStep}>
              {steps.map((step, key) => (<Step key={key} className={'payment-step'} status={step.status} title={step.title} />))}
            </Steps>
          </div>
          <div className={styles['main-header']}>
            <Button className={styles['back-btn']} type="ghost" icon={<ArrowLeftOutlined />} size="large">Back to cart</Button>
          </div>
          <div className={styles['step-content']}>
            <Layout className={styles['step-content-wrapper']}>
              <RenderStep />
              <Layout className={styles['summary-wrapper']}>
                <h2 className={styles['summary-header']}>Summary</h2>
                <Text type="secondary">10 items purchased</Text>
                <div className='flex-space' />
                <SummaryItem label='Cost of goods' value={'500,000'} />
                <SummaryItem label='Dropshipping Fee' value={'5,900'} />
                <SummaryItem isBig={true} label='Total' value={'505,900'} />
                <Button className={styles['submit-button']} type="primary">{steps[currentStep]?.submitText}</Button>
              </Layout>
            </Layout>
          </div>
        </div>
      </Content>
    </Layout>
  );

  function adjustStatus() {
    changeStep([...steps.map((step, key) => {
      const status: StepProps['status'] = key <= currentStep ? 'process' : 'wait'
      return {
        ...step,
        status,
      }
    })])    
  }
}

export default Home
