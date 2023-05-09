'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch';
import './styleSwitch.css';

type SwitchPrimitiveProps = SwitchPrimitive.SwitchProps

const Switch = ({ ...props }: SwitchPrimitiveProps) => (
  <form>
    <div className={'flex items-center cursor-pointer'}>
      {/*<label className="Label" htmlFor="airplane-mode" style={{ paddingRight: 15 }}>*/}
      {/*  Airplane mode*/}
      {/*</label>*/}
      <SwitchPrimitive.Root
        className="SwitchRoot"
        id="airplane-mode"
        {...props}
      >
        <SwitchPrimitive.Thumb className="SwitchThumb"/>
      </SwitchPrimitive.Root>
    </div>
  </form>
);

export default Switch;
