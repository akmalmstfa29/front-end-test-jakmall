import {
  ArrowLeftOutlined
} from '@ant-design/icons'
import { Button, Layout, StepProps, Steps } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.css'

const { Step } = Steps;

type Step = {
  title: string,
  status: StepProps['status']
}

const Home: NextPage = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [steps, changeStep] = React.useState<Array<Step>>([
    { title: 'Delivery', status: 'wait' },
    { title: 'Payment', status: 'wait' },
    { title: 'Finish', status: 'wait' },
  ]);
  
  React.useEffect(() => {
    adjustStatus()
  });

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
