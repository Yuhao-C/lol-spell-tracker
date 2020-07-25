/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { Badge } from 'antd';

import './index.scss';

const SpellCard = (props) => {
  const { spell, badge, handleSpellSelect } = props;
  const { imageUrl, id } = spell;
  const [loaded, setLoaded] = useState(false);
  return (
    <Badge offset={[-20, 5]} count={badge}>
      <div className={loaded ? 'loaded-square' : 'loading-square'}>
        <img className="spell-image" src={imageUrl} onClick={() => handleSpellSelect(id)} onLoad={() => setLoaded(true)} />
      </div>
    </Badge>
  );
};

export default SpellCard;
