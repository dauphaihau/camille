'use client';

import Link from 'next/link';
import { PATH } from 'config/const';
import {
  Button, Col, Grid, Icons, Row
} from 'core/components';

export default function PricingPage() {
  return (
    <div className='py-28 space-y-10'>
      <Col classes='space-y-2'>
        <h1 className='text-5xl font-bold'>
          Pricing
        </h1>
        <p>
          It’s free to create sites, no credit card needed. You only pay when you want to publish.
          It’s $8/month per
          site with a 7 day free trial.
        </p>
        <Link href={ PATH.LOGIN }>
          <Button>get started</Button>
        </Link>
      </Col>
      <div>
        <h3 className='text-2xl font-bold mb-4'>
          $11/month
        </h3>
        <Grid
          sx={ 2 }
          gap={ 4 }
        >
          <Col gap={ 4 }>
            {
              ['Unlimited Posts', 'Dynamic Content', 'Access note offline', 'Annotate PDFs'].map((title, index) => (
                <Row
                  align='center'
                  gap={ 2 }
                  key={ index }
                >
                  <Icons.check className='h-4 w-4' />
                  <p>{ title }</p>
                </Row>
              ))
            }
          </Col>
          <Col gap={ 4 }>
            {
              ['Sync unlimited devices', 'Help center & email support', 'Manage SEO metadata', 'Google Analytics'].map((title, index) => (
                <Row
                  align='center'
                  gap={ 2 }
                  key={ index }
                >
                  <Icons.check className='h-4 w-4' />
                  <p>{ title }</p>
                </Row>
              ))
            }
          </Col>
        </Grid>
      </div>
    </div>
  );
}
