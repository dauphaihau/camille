'use client'
import { Col, Icons, Row, Skeleton } from "core/components";
import { useEffect, useState } from "react";
import { getRandomInt } from "core/helpers";

export default function LoadingFullPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  return (
    <Col classes="mx-auto space-y-6">
      <Row>
        <aside
          style={{ boxShadow: 'rgba(0, 0, 0, 0.025) -1px 0px 0px 0px inset' }}
          className="group w-[240px] flex-col flex-grow-0 flex-shrink-0 md:flex bg-[#fafafa] h-screen overflow-hidden p-3"
        >
          <Row classes={'mb-8'} align={'center'} gap={2}>
            <Skeleton className="h-5 w-5"/>
            <Skeleton className="h-2.5 w-4/5"/>
          </Row>
          <Col gap={4} classes={'mb-8'}>
            <Skeleton className="h-3 w-2/5"/>
            <Skeleton className="h-3 w-2/5"/>
            <Skeleton className="h-3 w-3/5"/>
          </Col>
          <div>
            <Skeleton className="h-3 w-[30%] mb-3"/>
            <Col
              gap={1}
              classes={[isLoaded && 'fade-in-start',]}
            >
              {
                new Array(18).fill("").map((_, i) => {
                  return <Row
                    key={i}
                    data-fade={i}
                    align={'center'}
                  >
                    <Icons.arrowRightSline size={25} className={`animate-pulse fill-[#efefed] rounded`}/>
                    <Skeleton className="h-5 w-5 mr-2"/>
                    <Skeleton width={getRandomInt(80, 100)} className='h-2.5'/>
                  </Row>
                })
              }
            </Col>
          </div>
        </aside>

        <div className='w-full p-3'>
          <Row justify={'around'} align={'center'}>
            <Row align={'center'} gap={2} classes={'w-full'}>
              <Skeleton className="h-5 w-5"/>
              <Skeleton className="h-2.5 w-[8%]"/>
            </Row>
            <Skeleton className="h-2.5 w-[10%] block"/>
          </Row>
        </div>
      </Row>
    </Col>
  )
}
