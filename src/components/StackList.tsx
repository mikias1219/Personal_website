import React from 'react';
import { stack } from '../data/profile';

const StackList: React.FC = () => (
  <dl className="stack-list">
    {stack.map((group) => (
      <div key={group.group} className="stack-group spot reveal">
        <dt className="label">{group.group}</dt>
        <dd>
          <ul>
            {group.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </dd>
      </div>
    ))}
  </dl>
);

export default StackList;
