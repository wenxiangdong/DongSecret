import React from 'react';
import useMounted from '../../../hooks/use-mounted';
import Transition from '@vant/weapp/lib/transition';

/**
 *
 * 加载触发动画
 * @export
 * @param {{
 * name: String;
 * duration: String | Object;
 * style: React.CSSProperties;
 * children: any;
 * }} props
 */
export default function (props) {
  const mounted = useMounted();
  return (
    <Transition
      show={mounted}
      name={props.name}
      duration={props.duration}
      custom-style={props.style}
    >
      {props.children}
    </Transition>
  );
}
